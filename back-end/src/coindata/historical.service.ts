import axios from "axios";
import { IHoldingSnapshot, ITimeslices } from "../exchanges/exchange.model";
import { IPortfolioLineChartItem } from "../../../types";
import { IExchangeAccountDocument, IHoldingSlice, ITimeslice } from "../exchanges/exchange.model";
import { coindataService, getCurrentPrice } from "./coindata.service";
import { HistoricalData, HourlyData, IDailyPrice, IHourlyPrice } from "./historical.model";
import { debug } from "../_helpers/logs";

export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const ONE_WEEK = 604800000;

export type IDailyPrices = { [key: number ]: number }; // Look up a price for an asset by the daily timestamp

interface IHistoricalDataResponse {
  prices: [ number, number ][]; // time and price
}

export async function loadHistoricalDataToDb(symbol: string) {
  let coinId = await coindataService.getCoinId(symbol);

  var historicalDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10000`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });

  var historicalData = await HistoricalData.findOne({ assetId: coinId });
  if (!historicalData) {
    historicalData = new HistoricalData( { assetId: coinId } );
  }
  
  let length = historicalData.prices.length;
  var start = 0;
  if (length > 0)
  {
    var lastTimestamp = historicalData.prices[length - 1].timestamp;
    while (historicalDataJson.prices[start++][0] <= lastTimestamp);
    start--;
  }

  for (let i = start; i < historicalDataJson.prices.length; i++)
  {
    let timestamp: number = historicalDataJson.prices[i][0];
    let leftover = timestamp % ONE_DAY;
    if (leftover >= (ONE_DAY/2)) // halfway through the day
    { // round up to next day
      timestamp = timestamp + (ONE_DAY - leftover);
    }
    else
    { // round down to start of this day
      timestamp = timestamp - leftover;
    }
    
    historicalData.prices.push({ price: historicalDataJson.prices[i][1], timestamp});
  }

  const savedData = await historicalData.save().then((res) => res).catch((err) => { throw err; });
  return savedData;
}

export function fiat(symbol: string)
{
  switch (symbol)
  {
    case "usd":
    case "USD":
    case "USD/USD":
      return 1;
    default:
      return 0;
  }
}

export async function loadHourlyData(coinId: string)
{
  const now = Date.now() / 1000;
  const toTimestamp = now;
  const lastHour = now - (now % (ONE_HOUR/1000));
  const fromTimestamp = lastHour - (8 * (ONE_DAY/1000)); // subtract 8 days (in seconds) to get one week ago
  
  const hourlyDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err; });

  var hourlyData = await HourlyData.findOne({ assetId: coinId });
  if (!hourlyData) {
    hourlyData = new HourlyData( { assetId: coinId });
  }

  hourlyData.prices = [];

  for (let i = 0; i < hourlyDataJson.prices.length; i++)
  {
    
    let timestamp: number = hourlyDataJson.prices[i][0];
    let hour = (timestamp % ONE_HOUR) >= (ONE_HOUR/2) ? timestamp + (ONE_HOUR - (timestamp % ONE_HOUR)) : timestamp - (timestamp % ONE_HOUR); // round to nearest hour
    hourlyData.prices.push({ hour, price: hourlyDataJson.prices[i][1] });
  }

  const savedData = await hourlyData.save().then((res) => res).catch((err) => { throw err; });
  return savedData;
}

export async function getHourlyDataRange(symbol: string, from: number, to: number) : Promise<IHourlyPrice[]>
{
  let assetId = await coindataService.getCoinId(symbol);
  const hourlyPrices: IHourlyPrice[] = [];
  
  from = from - (from % ONE_HOUR); // round down to nearest hour
  to = to - (to % ONE_HOUR);

  if (fiat(symbol))
  {
    for (let i = from; i <= to; i += ONE_HOUR)
    {
      hourlyPrices.push({ hour: i, price: 1 });
    }

    return hourlyPrices;
  }
  
  var hourlyData = await HourlyData.findOne({ assetId: assetId });
  if (!hourlyData)
  {
    await loadHourlyData(assetId);
    hourlyData = await HourlyData.findOne({ assetId: assetId });
    if (!hourlyData) throw `Could not fetch hourly price data for asset '${assetId}'. [1]`;
  }

  var startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from);
  var endIndex = -1;
  var lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;

  if (startIndex == -1 || to > lastHour)
  {
    hourlyData = await loadHourlyData(assetId);
    startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from);
    lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;
    if (startIndex == -1)
    { // attempt to grab last hour's price
      debug(`used last hour's price for ${assetId}`);
      startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from - ONE_HOUR);
      endIndex = startIndex;
      if (startIndex == -1)
      { // attempt to grab the latest price we have
        debug(`used last retrieved price for ${assetId}`);
        startIndex = hourlyData.prices.length - 1;
        endIndex = hourlyData.prices.length - 1;
      }
    }
    if (startIndex == -1) throw `Could not fetch hourly price data for asset '${assetId}'. [2]`;
  }

  if (endIndex == -1)
  {
    endIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == to);
  }

  if (endIndex == -1)
  {
    // attempt to grab last hour's price
    debug(`used last hour's price for ${assetId}`);
    endIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == to - ONE_HOUR);
    if (endIndex == -1) {
      // attempt to grab the latest price we have
      debug(`used last retrieved price for ${assetId}`);
      endIndex = hourlyData.prices.length - 1;
      if (endIndex == -1) { throw `Could not fetch hourly price data for asset '${assetId}'. [3]`; }
    }
  }

  for (let i = startIndex; i <= endIndex; i++)
  {
    hourlyPrices.push(hourlyData.prices[i]);
  }

  return hourlyPrices;
}

export function extractHoldingsIdsFromTimeslices(timeslices: ITimeslice[]): string[]
{
  let assetIds = new Set<string>();
  for (let i = 0; i < timeslices.length; i++)
  {
    let holdings = Object.values<IHoldingSlice>(timeslices[i].holdings);
    for (let j = 0; j < holdings.length; j++)
    {
      assetIds.add(holdings[j].asset);
    }
  }
  return Array.from(assetIds);
}

export async function getLatestHourlyTimeSeries(exchangeAccount: IExchangeAccountDocument, timeslices: ITimeslice[]): Promise<IPortfolioLineChartItem[]>
{
  if (exchangeAccount.hourlyTimeSeries == undefined)
  {
    exchangeAccount.hourlyTimeSeries = {};
  }
  let timeseries: ITimeslice[] = Object.values(exchangeAccount.hourlyTimeSeries);
  let latestHour = getLatestHour();
  // If this is already cached, we can just return it as is.
  if (timeseries.length > 0 && timeseries[timeseries.length - 1].start >= latestHour - ONE_HOUR)
  {
    return timeseries.map((entry) => ({
      T: entry.start,
      USD: entry.value
    }));
  }
  // Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
  // If there is partial data available,
	// we will append the latest data and return the whole series.
  let assetIds = extractHoldingsIdsFromTimeslices(timeslices);
  return loadLatestHourlyTimeSeries(exchangeAccount, assetIds, timeslices);
}

export function getLatestHour() {
  let now = Date.now();
  let latestHour = now - (now % ONE_HOUR);
  return latestHour;
}

export async function loadLatestHourlyTimeSeries(exchangeAccount: IExchangeAccountDocument, assetIds: string[], timeslices: ITimeslice[], saveDocument: boolean = true): Promise<IPortfolioLineChartItem[]>
{
  let hourlySlices: { [key: number]: ITimeslice } = {};
  let lastAmount: { [key: string]: number } = {};
  let lastPrice: { [key: string]: number } = {};
  let prices: { [key: string]: { [key: number]: IHourlyPrice } } = {};
  let cachedHours = 0;
  let daysCached = 0;
  const latestHour = getLatestHour();
  const startOfToday = latestHour - (latestHour % ONE_DAY)
  const oneWeekAgo = latestHour - ONE_WEEK; // subtract 7 days (in milliseconds) to get one week ago
  
  for (let i = 0; i < assetIds.length; i++)
  { // Grab last week of hourly prices for each symbol in holdings
    let hourlyPrices = await getHourlyDataRange(assetIds[i], oneWeekAgo-ONE_HOUR, latestHour);
    prices[assetIds[i]] = {};
    for (let j = 0; j < hourlyPrices.length; j++)
    {
      prices[assetIds[i]][hourlyPrices[j].hour] = hourlyPrices[j];
    }
  }

  if (timeslices[timeslices.length - 1].start < startOfToday)
  {
    throw "The exchange account has not been synced";
  }
  if (timeslices.length < 8) { throw "The exchange account does not have a full week of data."; }

  /// TODO: Check if we already have part of the hourly time series cached and only append new data
  let cachedHourlyTimeSeries: ITimeslice[] = [];
  if (exchangeAccount.hourlyTimeSeries)
  {
    cachedHourlyTimeSeries = Object.values(exchangeAccount.hourlyTimeSeries);
  }
  if (cachedHourlyTimeSeries && cachedHourlyTimeSeries.length > 0)
  {
    if (cachedHourlyTimeSeries[cachedHourlyTimeSeries.length - 1].start >= latestHour - ONE_HOUR)
    {
      return cachedHourlyTimeSeries.map((timeslice) => {
        return { T: timeslice.start, USD: timeslice.value };
      });
    }

    let lastHourCached = cachedHourlyTimeSeries[cachedHourlyTimeSeries.length - 1].start;
    let firstHourNeeded = oneWeekAgo - ONE_HOUR
    if (lastHourCached >= firstHourNeeded) // is the cached data within our range of required data?
    {
      // start from the last index and go back however many hours are cached that we require
      let startIndex = (cachedHourlyTimeSeries.length) - ((lastHourCached - firstHourNeeded) / ONE_HOUR);
      
      for (let i = startIndex; i < cachedHourlyTimeSeries.length; i++) // save the relevant cached hourly slices
      {
        hourlySlices[cachedHourlyTimeSeries[i].start] = cachedHourlyTimeSeries[i];
        cachedHours++;
      }

      daysCached = ~~(((lastHourCached + ONE_HOUR) - (timeslices[timeslices.length - 8].start)) / ONE_DAY); // integer division to get days cached
      
      // initialize the holdings amounts and prices from the last hour cached
      for (let [key, value] of Object.entries(hourlySlices[lastHourCached].holdings))
      {
        lastAmount[key] = value.amount;
        lastPrice[key] = value.price;
      }
    }
  }
  else if (timeslices.length >= 9)
  {
    // initialize the holdings amounts and prices from 8 days ago
    for (let [key, value] of Object.entries(timeslices[timeslices.length - 9].holdings))
    {
        lastAmount[key] = value.amount;
        lastPrice[key] = value.price;
    }
  }

  for (let i = timeslices.length - 8 + daysCached; i < timeslices.length; i++)
  {
    let dailySlice = timeslices[i];
    let startOfDay = dailySlice.start;
    let endOfDay = Math.min(startOfDay + ONE_DAY, latestHour);
    let holdings = Object.values(dailySlice.holdings);
    let currentSnap: { [key: string]: number } = {};
    let firstPass = false;

    // set first day's start to the last cached hour
    if (i == timeslices.length - 8 + daysCached)
    {
      startOfDay = oneWeekAgo-ONE_HOUR + (cachedHours * ONE_HOUR);
      if (cachedHours > 0) { firstPass = true; }
    }
    
    // initialize the current snapshots index for each holding to 0 for each daily slice
    holdings.forEach((holding) => {
      currentSnap[holding.asset] = 0;
    });
    
    for (let hour = startOfDay; hour < endOfDay; hour+=ONE_HOUR)
    {
      let hourlySlice: ITimeslice = {
				start: hour,
				value: 0,
				holdings: {},
			};
      let snapsInThisSlice: IHoldingSnapshot[] = [];

      for (let j=0, holding = holdings[j]; j < holdings.length; holding = holdings[++j])
      {
        const currentAsset = holding.asset;
        for (let index = currentSnap[currentAsset]; index < holding.snapshots.length; index++)
        {
          let snap = holding.snapshots[index];
          if (snap.timestamp < hour + ONE_HOUR)
          {
            snapsInThisSlice.push(snap);
            lastAmount[currentAsset] = snap.totalAmountBought - snap.totalAmountSold;
            lastPrice[currentAsset] = snap.price.USD;
            currentSnap[currentAsset]++;
          } else { break; }
        }

        let hourlyPrice = prices[currentAsset][hour];
        if (hourlyPrice != undefined) { lastPrice[currentAsset] = hourlyPrice.price; }
        if (!lastAmount[currentAsset]) { lastAmount[currentAsset] = 0; }
        let value = lastAmount[currentAsset] * lastPrice[currentAsset];

        let hourlyHoldingSlice = {
          asset: currentAsset,
          amount: lastAmount[currentAsset],
          price: lastPrice[currentAsset],
          value,
          snapshots: snapsInThisSlice,
        };

        hourlySlice.holdings[currentAsset] = hourlyHoldingSlice;
        hourlySlice.value += value;
      }

      if (firstPass){ firstPass = false; }
      else { hourlySlices[hour] = hourlySlice; }
    }
  }

  exchangeAccount.hourlyTimeSeries = hourlySlices;
  if (saveDocument) { const savedExchangeAccount = await exchangeAccount.save(); }

  return Object.entries(hourlySlices).map((value: [string, ITimeslice]) => {
    return { T: value[1].start, USD: value[1].value };
  });
}

export async function getHistoricalData(symbol: string, timestamp: number) : Promise<number>
{
  let assetId = await coindataService.getCoinId(symbol);
  let now = Date.now();
  let today = now - (now % ONE_DAY);
  if (timestamp == today)
  {
    let currentPrice = await getCurrentPrice(symbol);
    if (!currentPrice) throw "Could not fetch current price.";
    return currentPrice;
  }

  var historicalData = await HistoricalData.findOne({ assetId: assetId });
  if (!historicalData) {
    historicalData = await loadHistoricalDataToDb(symbol);
    if (!historicalData) {
      throw "Could not fetch historical data [1]";
    }
  }
  const date = (timestamp - (timestamp % ONE_DAY));
  var candle = historicalData.prices.find((candle) => candle.timestamp == date);
  if (!candle)
  {
    if (historicalData.prices.length < 1)
    {
      throw "Could not fetch historical data [2]";
    }
    // if we need to grab the newest prices
    if (historicalData.prices[historicalData.prices.length - 1].timestamp < date)
    {
      historicalData = await loadHistoricalDataToDb(symbol); 
    }
    else if (historicalData.prices[0].timestamp > date)
    {
      throw "Could not fetch historical data [3]";
    }
    else
    {
      throw "Could not fetch historical data [4]";
    }

    candle = historicalData.prices.find((candle) => candle.timestamp == date);
  }
  return candle.price;
}

export async function getHistoricalDataRange(symbol: string, from: number, to: number) : Promise<IDailyPrices>
{
  let assetId = await coindataService.getCoinId(symbol);
  let dailyPrices: IDailyPrices = {};
  let now = Date.now();
  let today = now - (now % ONE_DAY);

  if (to == today) // fetch latest price for today
  {
    let currentPrice = await getCurrentPrice(symbol);
    if (!currentPrice) throw "Could not fetch current price.";
    dailyPrices[today] = currentPrice;
    to = today - ONE_DAY;
    if (from == today) return dailyPrices;
  }

  var historicalData = await HistoricalData.findOne({ assetId: assetId });
  if (!historicalData) {
    historicalData = await loadHistoricalDataToDb(symbol);
    if (!historicalData) {
      throw "Could not fetch historical data [1]";
    }
  }

  // If the range is larger than the dataset, just return the whole dataset
  if ((to - from)/ONE_DAY >= historicalData.prices.length)
  {
    historicalData.prices.forEach((day) => {
      dailyPrices[day.timestamp] = day.price;
    });
    return dailyPrices;
  }

  // Get the start index
  let startIndex = historicalData.prices.findIndex((day) => day.timestamp == from);
  if (startIndex == -1)
  {
    debug(`Could not find daily historical value of ${symbol} at timestamp: ${from}`);
    startIndex = 0;
  }
  // Get the end index
  let endIndex = historicalData.prices.findIndex((day) => day.timestamp == to);
  if (endIndex == -1)
  {
    debug(`Could not find daily historical value of ${symbol} at timestamp: ${to}`);
    endIndex = historicalData.prices.length - 1;
  }

  for (let i = startIndex; i <= endIndex; i++)
  {
    dailyPrices[historicalData.prices[i].timestamp] = historicalData.prices[i].price;
  }

  return dailyPrices;
}