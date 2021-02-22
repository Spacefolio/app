import axios from "axios";
import moment from "moment";
import { dailyCandleSchema, HistoricalData, IDailyCandle, IDailyCandleDocument } from "./historical.model";

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
  symbol: string;
  historical: [IHistoricalCandleResponse];
}

export async function loadHistoricalDataToDb(symbol: string) {
  var symbol = 'XRP';
  var dailyCandles: IDailyCandle[] = [];

  var historicalDataJson = await axios.get<IHistoricalDataResponse>(`https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}USD?apikey=77c0e8deb5f1500de6679057af187bef`).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });

  const historicalData = new HistoricalData( { symbol:historicalDataJson.symbol } );

  for (let i = 0; i < historicalDataJson.historical.length; i++)
  {
    let dateString: string = historicalDataJson.historical[i].date;
    let day: number = moment(dateString, "YYYY-MM-DD").valueOf();
    
    historicalData.dailyCandles.push({...historicalDataJson.historical[i], day});
  }

  const savedData = await historicalData.save().then((res) => res.toJSON()).catch((err) => { console.log(err); });
  return savedData;
}

export async function getHistoricalData(symbol: string, )
{
  const historicalData = await HistoricalData.findOne({ symbol });
}