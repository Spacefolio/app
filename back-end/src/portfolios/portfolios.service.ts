import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";

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

async function getMetaportfolioChart(userId: string) {
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

async function getPortfolioChart(userId: string) {
  var portfolioData = await exchangeService.getAll(userId);
}