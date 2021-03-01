import axios from "axios";
import { DEFAULT_ENCODING } from "crypto";
import { resourceLimits } from "worker_threads";
import { CoinData, ICoinListItem, ICoinMarketData } from "./coindata.model";

export const coindataService = {
  fetchCoinMarketData,
  getCoinMarketData
};

async function fetchCoinMarketData()
{
  const coinList = await axios.get<ICoinListItem[]>("https://api.coingecko.com/api/v3/coins/list").then((res) => {
    return res.data;
  }).catch((err) => { throw err; });

  const coinMarketData = await fetchAllCoinsMarketData();

  let now = new Date();
  let coinDataDoc = await CoinData.updateOne({}, { coinList, coinListLastUpdated: now, coinMarketData }, { upsert: true });
}

async function getCoinMarketData(symbol: string)
{
  
}

async function fetchAllCoinsMarketData(page:number = 1) : Promise<ICoinMarketData[]>
{
  const results = await fetchCoinMarketDataPage(page);
  if (results.length > 0)
  {
    return results.concat(await fetchAllCoinsMarketData(page + 1));
  }
  else
  {
    return results;
  }
}

async function fetchCoinMarketDataPage(page:number = 1)
{
  const results = await axios.get<ICoinMarketData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`).then((res) => {
    return res.data;
  }).catch((err) => { throw err; });

  return results;
}

