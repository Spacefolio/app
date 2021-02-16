import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculations } from "../../../front-end/exchangeDataDetailed";
import {
  IExchangeAccountRequest,
  exchangeType,
  IExchangeAccount,
} from "../../../types";
import ccxt, { Exchange, exchanges } from "ccxt";

export const portfolioService = {
  get,
};

async function get(userId: string, sync: boolean) {
  const user = await User.findById(userId).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  return sync
    ? await exchangeService
        .syncExchangeData(userId)
        .then(() => mockPortfolioCalculations)
    : {};

  // TODO: calculate the portfolio data and return it
}
