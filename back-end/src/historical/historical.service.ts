import axios from "axios";
import { dailyCandleSchema, HistoricalData } from "./historical.model";

interface IHistoricalCandleResponse {
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
  symbol: string;
  historical: [IHistoricalCandleResponse];
}

export async function loadHistoricalDataToDb(symbol: string) {
  var symbol = 'XRP';

  var historicalDataJson = await axios.get<IHistoricalDataResponse>(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}USD?apikey=77c0e8deb5f1500de6679057af187bef`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });
  for (let i = 0; i < historicalDataJson.historical.length; i++)
  {
    //let day: number = 
    historicalDataJson.historical[i] = {...historicalDataJson.historical[i], }
  }
  const historicalData = new HistoricalData( { symbol:historicalDataJson.symbol, dailyCandles: historicalDataJson.historical} );
  const savedData = await historicalData.save().then((res) => res.toJSON()).catch((err) => { throw err; });
  return savedData;
}

export async function getHistoricalData(symbol: string, )
{
  //const historicalData = HistoricalData.findOne({ symbol, date: })
}