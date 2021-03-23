import axios from "axios";
import { Coin, ICoinMarketData } from "./coindata.model";
import { getLatestHour, ONE_HOUR } from "./historical.service";

export const coindataService = {
  fetchCoinMarketData: fetchAllCoinsMarketData,
  getCoinMarketData,
  getCoinId,
};

async function fetchAllCoinsMarketData()
{
  const coinMarketData = await fetchAllCoinsMarketDataCursor();

  let now = Date.now();

  for (let i = 0; i < coinMarketData.length; i++)
  {
    let coin = await Coin.updateOne({ id: coinMarketData[i].id }, { id: coinMarketData[i].id, symbol: coinMarketData[i].symbol, currentMarketData: coinMarketData[i], currentPrice: { USD: coinMarketData[i].current_price, lastUpdated:  now }  }, { upsert: true }, (err, raw) => { if (err) throw err; });
  }

  return {};
}

async function fetchCoinMarketData(assetId: string)
{
  const results = await axios.get<ICoinMarketData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${assetId}&order=market_cap_desc&per_page=250&page=1&sparkline=true`).then((res) => {
    return res.data;
  }).catch((err) => { throw err; });

  let now = Date.now();
  let coin = await Coin.updateOne({ id: assetId }, { currentMarketData: results[0], currentPrice: { USD: results[0].current_price, lastUpdated: now }  }, { upsert: true }, (err, raw) => { if (err) throw err; });

  return {};
}

async function getCoinId(symbol: string)
{
  let symbolLower = symbol.toLowerCase();
  var coinId = await Coin.findOne({ symbol: symbolLower });
  if (!coinId) throw `Could not find coin with symbol '${symbolLower}'.`;
  return coinId.id;
}

async function getCoinMarketData(symbol: string)
{
  let symbolLower = symbol.toLowerCase();
  var coinData = await Coin.findOne({ symbol: symbolLower }).lean();
  if (!coinData)
  {
    let coin = await Coin.findOne();
    if (!coin)
    {
      await fetchAllCoinsMarketData();
      coinData = await Coin.findOne({ symbol: symbolLower }).lean();
    }
    if (!coinData) { throw `Failed to fetch coin market data for symbol '${symbol}'`; }
  }

  let lastUpdated = Date.parse(coinData.currentMarketData.last_updated);
  
  if (lastUpdated < getLatestHour() - ONE_HOUR)
  {
    await fetchCoinMarketData(coinData.id);
    coinData = await Coin.findOne({ symbol: symbolLower });
    if (!coinData) { throw `Failed to update coin market data for symbol '${symbol}'`; }
  }
  
  return coinData.currentMarketData;
}

interface ISimplePriceResponse
{
  [coinId: string]: { usd: number }
}

async function fetchCurrentPrice(coinId: string) : Promise<number>
{
  var tickerJson = await axios.get<ISimplePriceResponse>(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`, { timeout: 3000 }).then((jsonResponse) => jsonResponse.data).catch((err) => { throw err });
  if (!tickerJson) { return 1; }
  return tickerJson[coinId] ? tickerJson[coinId].usd : 1;
}

export async function getCurrentPrice(symbol: string)
{
  let coinData = await getCoinDataDocument(symbol);
  return coinData.currentPrice.USD;
}

async function getCoinDataDocument(symbol: string) {
  let symbolLower = symbol.toLowerCase();
  var coinData = await Coin.findOne({ symbol: symbolLower });

  if (!coinData) {
    let coin = await Coin.findOne();
    if (!coin) {
      await fetchAllCoinsMarketData();
      coinData = await Coin.findOne({ symbol: symbolLower });
    }
    if (!coinData) { throw `Failed to fetch coin market data for symbol '${symbol}'`; }
  }

  if (coinData.currentPrice.lastUpdated < (Date.now() - 3000))
  {
    let latestPrice = await fetchCurrentPrice(coinData.id);
    coinData.currentPrice.USD = latestPrice;
    coinData.currentPrice.lastUpdated = Date.now();
    coinData.save();
  }

  let lastUpdated = Date.parse(coinData.currentMarketData.last_updated);
  
  if (lastUpdated < getLatestHour() - ONE_HOUR)
  {
    await fetchCoinMarketData(coinData.id);
    coinData = await Coin.findOne({ symbol: symbolLower });
    if (!coinData) { throw `Failed to update coin market data for symbol '${symbol}'`; }
  }

  return coinData;
}

async function fetchAllCoinsMarketDataCursor(page:number = 1) : Promise<ICoinMarketData[]>
{
  const results = await fetchCoinMarketDataPage(page);
  if (results.length > 0)
  {
    return results.concat(await fetchAllCoinsMarketDataCursor(page + 1));
  }
  else
  {
    return results;
  }
}

async function fetchCoinMarketDataPage(page:number = 1)
{
  const results = await axios.get<ICoinMarketData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true`).then((res) => {
    return res.data;
  }).catch((err) => { throw err; });

  return results;
}

