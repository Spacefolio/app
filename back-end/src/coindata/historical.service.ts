import axios from "axios";
import moment from "moment";
import { coindataService } from "./coindata.service";
import { HistoricalData } from "./historical.model";

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
  prices: [ number, number ][]; // day and price
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

export async function loadHistoricalDataToDb(symbol: string, coinId: string) {

  var historicalDataJson = await axios.get<IHistoricalDataResponse>(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10000`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });

  const historicalData = new HistoricalData( { symbol } );

  for (let i = 0; i < historicalDataJson.prices.length; i++)
  {
    let timestamp: number = historicalDataJson.prices[i][0];
    historicalData.prices.push({ price: historicalDataJson.prices[i][1], timestamp});
  }

  const savedData = await historicalData.save().then((res) => res.toJSON()).catch((err) => { console.log(err); });
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

export async function getHistoricalData(symbol: string, timestamp: number) : Promise<number>
{
  var symbols = symbol.split('/');
  var historicalData = await HistoricalData.findOne({ symbol: symbols[0] });
  if (!historicalData) {
    let coinData = await coindataService.getCoinMarketData(symbols[0]);
    if (!coinData) throw `Could not find coin data for symbol '${symbols[0]}'.`;
    historicalData = await loadHistoricalDataToDb(symbols[0], coinData.id);
    if (!historicalData) {
      return 1;
    }
  }
  const date = (timestamp - (timestamp % 86400000));
  const candle = historicalData.prices.find((candle) => candle.timestamp == date);
  if (!candle) return 1;
  return candle.price;
}