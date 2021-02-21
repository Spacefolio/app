import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";

export const portfolioService = {
  getAll,
  get,
  sync
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