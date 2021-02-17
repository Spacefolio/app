import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculations, mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";
import {
  IExchangeAccountRequest,
  exchangeType,
  IExchangeAccount,
} from "../../../types";
import ccxt, { Exchange, exchanges } from "ccxt";
import { IPortfolioItem } from "./models/portfolio.model";
import { response } from "express";
import { json } from "body-parser";

export const portfolioService = {
  get,
};

async function get(userId: string, sync: string) {
  const user = await User.findById(userId).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  return sync == "true"
    ? await exchangeService
        .syncAllExchangesData(userId)
        .then((portfolioItems) => {
          //console.log(res)
          return mockPortfolioCalculations(portfolioItems);
        }).catch((err) => { throw err; })
    : mockPortfolioCalculationsFake();

  // TODO: calculate the portfolio data and return it
}