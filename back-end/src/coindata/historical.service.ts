import axios from "axios";
import { IHoldingSnapshot, ITimeslices } from "../exchanges/exchange.model";
import { IPortfolioLineChartItem } from "../../../types";
import { IExchangeAccountDocument, IHoldingSlice, ITimeslice } from "../exchanges/exchange.model";
import { coindataService, getCurrentPrice } from "./coindata.service";
import { HistoricalData, HourlyData, IDailyPrice, IHourlyPrice } from "./historical.model";

export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const ONE_WEEK = 604800000;

interface IHistoricalCandleResponse {
  day: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

interface IHistoricalDataResponse {
  prices: [ number, number ][]; // time and price
}

interface ITickerResponse {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearhHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  sharesOutstanding: number;
  timestamp: number;
}

export async function loadHistoricalDataToDb(symbol: string) {
  let coinId = await coindataService.getCoinId(symbol);

  var historicalDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10000`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });

  var historicalData = await HistoricalData.findOne({ symbol });
  if (!historicalData) {
    historicalData = new HistoricalData( { symbol } );
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
    let leftover = timestamp % 86400000;
    if (leftover >= 43200000) // halfway through the day
    { // round up to next day
      timestamp = timestamp + (86400000 - leftover);
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
    case "USD":
    case "USD/USD":
      return 1;
    default:
      return 0;
  }
}

export async function loadHourlyData(symbol: string)
{
  const coinId = await coindataService.getCoinId(symbol);
  const now = Date.now() / 1000;
  const toTimestamp = now;
  const lastHour = now - (now % 3600);
  const fromTimestamp = lastHour - 691200; // subtract 8 days (in seconds) to get one week ago
  
  const hourlyDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err; });

  var hourlyData = await HourlyData.findOne({ symbol });
  if (!hourlyData) {
    hourlyData = new HourlyData( { symbol });
  }

  hourlyData.prices = [];

  for (let i = 0; i < hourlyDataJson.prices.length; i++)
  {
    
    let timestamp: number = hourlyDataJson.prices[i][0];
    let hour = timestamp % 3600000 >= 1800000 ? timestamp + (3600000 - (timestamp % 3600000)) : timestamp - (timestamp % 3600000); // round to nearest hour
    hourlyData.prices.push({ hour, price: hourlyDataJson.prices[i][1] });
  }

  const savedData = await hourlyData.save().then((res) => res).catch((err) => { throw err; });
  return savedData;
}

export async function getHourlyData(symbol: string, from: number, to: number) : Promise<IHourlyPrice[]>
{
  const hourlyPrices: IHourlyPrice[] = [];
  
  from = from - (from % 3600000); // round down to nearest hour
  to = to - (to % 3600000);

  if (fiat(symbol))
  {
    for (let i = from; i <= to; i += 3600000)
    {
      hourlyPrices.push({ hour: i, price: 1 });
    }

    return hourlyPrices;
  }
  
  var hourlyData = await HourlyData.findOne({ symbol });
  if (!hourlyData)
  {
    await loadHourlyData(symbol);
    hourlyData = await HourlyData.findOne({ symbol });
    if (!hourlyData) throw `Could not fetch hourly price data for symbol '${symbol}'. [1]`;
  }

  var startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from);
  var endIndex = -1;
  var lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;

  if (startIndex == -1 || to > lastHour)
  {
    hourlyData = await loadHourlyData(symbol);
    startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from);
    lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;
    if (startIndex == -1)
    { // attempt to grab last hour's price
      console.log(`used last hour's price for ${symbol}`);
      startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from - ONE_HOUR);
      endIndex = startIndex;
      if (startIndex == -1)
      { // attempt to grab the latest price we have
        console.log(`used last retrieved price for ${symbol}`);
        startIndex = hourlyData.prices.length - 1;
        endIndex = hourlyData.prices.length - 1;
      }
    }
    if (startIndex == -1) throw `Could not fetch hourly price data for symbol '${symbol}'. [2]`;
  }

  if (endIndex == -1)
  {
    endIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == to);
  }

  if (endIndex == -1)
  {
    // attempt to grab last hour's price
    console.log(`used last hour's price for ${symbol}`);
    endIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == to - ONE_HOUR);
    if (endIndex == -1) {
      // attempt to grab the latest price we have
      console.log(`used last retrieved price for ${symbol}`);
      endIndex = hourlyData.prices.length - 1;
      if (endIndex == -1) { throw `Could not fetch hourly price data for symbol '${symbol}'. [3]`; }
    }
  }

  for (let i = startIndex; i <= endIndex; i++)
  {
    hourlyPrices.push(hourlyData.prices[i]);
  }

  return hourlyPrices;
}

export function extractHoldingsSymbolsFromTimeslices(timeslices: ITimeslice[]): string[]
{
  let symbols = new Set<string>();
  for (let i = 0; i < timeslices.length; i++)
  {
    let holdings = Object.values<IHoldingSlice>(timeslices[i].holdings);
    for (let j = 0; j < holdings.length; j++)
    {
      symbols.add(holdings[j].asset);
    }
  }
  return Array.from(symbols);
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
  if (timeseries.length > 0 && timeseries[timeseries.length - 1].start >= latestHour)
  {
    return timeseries.map((entry) => ({
      T: entry.start,
      USD: entry.value
    }));
  }
  // Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
  // If there is partial data available,
	// we will append the latest data and return the whole series.
  let symbols = extractHoldingsSymbolsFromTimeslices(timeslices);
  return loadLatestHourlyTimeSeries(exchangeAccount, symbols, timeslices);
}

function getLatestHour() {
  let now = Date.now();
  let latestHour = now - (now % 3600000);
  return latestHour;
}

export async function loadLatestHourlyTimeSeries(exchangeAccount: IExchangeAccountDocument, symbols: string[], timeslices: ITimeslice[]): Promise<IPortfolioLineChartItem[]>
{
  let hourlySlices: { [key: number]: ITimeslice } = {};
  let lastAmount: { [key: string]: number } = {};
  let lastPrice: { [key: string]: number } = {};
  let prices: { [key: string]: { [key: number]: IHourlyPrice } } = {};
  const latestHour = getLatestHour();
  const startOfToday = latestHour - (latestHour % ONE_DAY)
  const oneWeekAgo = latestHour - ONE_WEEK; // subtract 7 days (in milliseconds) to get one week ago
  
  for (let i = 0; i < symbols.length; i++)
  { // Grab last week of hourly prices for each symbol in holdings
    let hourlyPrices = await getHourlyData(symbols[i], oneWeekAgo-ONE_HOUR, latestHour);
    prices[symbols[i]] = {};
    for (let j = 0; j < hourlyPrices.length; j++)
    {
      prices[symbols[i]][hourlyPrices[j].hour] = hourlyPrices[j];
    }
  }

  if (timeslices[timeslices.length - 1].start < startOfToday)
  {
    throw "The exchange account has not been synced";
  }
  if (timeslices.length < 8) { throw "The exchange account does not have a full week of data."; }

  if (timeslices.length >= 9)
  { // initialize the holdings amounts and prices from 8 days ago
    for (let [key, value] of Object.entries(timeslices[timeslices.length - 9].holdings)) {
			lastAmount[key] = value.amount;
			lastPrice[key] = value.price;
		}
  }

  /// TODO: Check if we already have part of the hourly time series cached and only append new data
  /*
  let cachedHourlyTimeSeries: ITimeslice[] = Object.values(exchangeAccount.hourlyTimeSeries);
  if (cachedHourlyTimeSeries[cachedHourlyTimeSeries.length - 1].start == latestHour)
  {
    return cachedHourlyTimeSeries;
  }
  */

  for (let i = timeslices.length - 8; i < timeslices.length; i++)
  {
    let dailySlice = timeslices[i];
    let startOfDay = dailySlice.start;
    let endOfDay = Math.min(startOfDay + ONE_DAY, latestHour);
    let holdings = Object.values(dailySlice.holdings);
    let currentSnap: { [key: string]: number } = {};

    if (i == 0) { startOfDay = oneWeekAgo-ONE_HOUR; }
    
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

      hourlySlices[hour] = hourlySlice;
    }
  }

  return Object.entries(hourlySlices).map((value: [string, ITimeslice]) => {
    return { T: value[1].start, USD: value[1].value };
  });
}

export async function getHistoricalData(symbol: string, timestamp: number) : Promise<number>
{
  var symbols = symbol.split('/');
  let now = Date.now();
  let today = now - (now % 86400000);
  if (timestamp == today)
  {
    let currentPrice = await getCurrentPrice(symbol);
    if (!currentPrice) throw "Could not fetch current price.";
    return currentPrice;
  }

  var historicalData = await HistoricalData.findOne({ symbol: symbols[0] });
  if (!historicalData) {
    historicalData = await loadHistoricalDataToDb(symbols[0]);
    if (!historicalData) {
      throw "Could not fetch historical data [1]";
    }
  }
  const date = (timestamp - (timestamp % 86400000));
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
      historicalData = await loadHistoricalDataToDb(symbols[0]); 
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