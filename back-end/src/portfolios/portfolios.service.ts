import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";
import { ITransactionItemView, timespan } from "../../../types";
import { IExchangeAccountDocument, IHoldingSlice, ITimeslice, ITimeslices } from "../exchanges/exchange.model";
import ccxt from "ccxt";
import { userService } from "../users/user.service";

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
  var user = await userService.getById(userId);
  if (!user) throw "user not found";

  let timeslices: ITimeslices = {};

  for (let exchangeId of user.linkedExchanges)
  {
    const exchangeDocument = await exchangeService.getById(exchangeId);

    Object.entries(exchangeDocument.timeslices).forEach(([timestamp, timeslice]:[string, ITimeslice]) => {
      if (!timeslices[timeslice.start])
      {
        timeslices[timeslice.start] = timeslice;
      }
      else
      {
        timeslices[timeslice.start].value += timeslice.value;
      }
    });
  }

  return Object.entries(timeslices).map(([timestamp, timeslice]:[string, ITimeslice]) => {
    return { T: timestamp, USD:timeslice.value };
  });

}

async function getPortfolioChart(userId: string, portfolioId: string, timespan: timespan) {
  var exchange = await exchangeService.getById(portfolioId);
  
  const { timeslices } = exchange;

  return Object.entries(timeslices).map(([timestamp, timeslice]:[string, ITimeslice]) => {
    return {T: timestamp, USD:timeslice.value};
  });
}