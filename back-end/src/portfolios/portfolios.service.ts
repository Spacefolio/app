import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";
import { ITransactionItemView, timespan } from "../../../types";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import ccxt from "ccxt";

export const portfolioService = {
  getAll,
  get,
  sync,
  getPortfolioChart,
  getMetaportfolioChart
};

async function sync(userId: string) {
  return await exchangeService
        .syncAllExchangesData(userId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function getAll(userId: string) {
  return await exchangeService
        .getExchangesData(userId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function get(userId: string, exchangeId: string) {
  return await exchangeService
        .getExchangeData(userId, exchangeId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function getMetaportfolioChart(userId: string, timespan: timespan) {
  var portfolioData = await exchangeService.getExchangesData(userId);

  for (let i = 0; i < portfolioData.length; i++)
  {
    let portfolio = portfolioData[i];
    let portfolioItems = portfolio.portfolioItems;

    for (let j = 0; j < portfolioItems.length; j++)  
    {
      let item = portfolioItems[j];
    }
  }
}

async function getPortfolioChart(userId: string, portfolioId: string, timespan: timespan) {
  var exchange = await exchangeService.getById(portfolioId);
  
  const { timeslices } = exchange;

  Object.entries(timeslices).map(([key, value]) => {
    console.log(key, value);
  });
}