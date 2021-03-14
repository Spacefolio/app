import axios from "axios";
import moment from "moment";
import { coindataService, getCurrentPrice } from "./coindata.service";
import { HistoricalData, HourlyData, IDailyPrice, IHourlyPrice } from "./historical.model";

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

  var toTimestamp = now;
  let lastHour = now - (now % 3600);
  var fromTimestamp = lastHour - 691200; // subtract 8 days (in seconds) to get one week ago

  var hourlyDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err; });

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

  if (startIndex == -1)
  {
    hourlyData = await loadHourlyData(symbol);
    startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from);
    lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;
    if (startIndex == -1)
    { // attempt to grab last hour's price
      console.log(`used last hour's price for ${symbol}`);
      startIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == from - 3600000);
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

  if (endIndex == -1) throw `Could not fetch hourly price data for symbol '${symbol}'. [3]`;

  for (let i = startIndex; i <= endIndex; i++)
  {
    hourlyPrices.push(hourlyData.prices[i]);
  }

  return hourlyPrices;
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