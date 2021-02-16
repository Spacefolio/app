import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculations } from "../../../front-end/exchangeDataDetailed";
import {
  IExchangeAccountRequest,
  exchangeType,
  IExchangeAccount,
} from "../../../types";
import ccxt, { Exchange } from "ccxt";

export const portfolioService = {
  get,
};

async function get(userId: string, sync: boolean) {
  const user = await User.findById(userId).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  if (sync) {
    return await exchangeService
      .syncExchangeData(userId)
      .then(() => mockPortfolioCalculations);
  } else return;

  // TODO: calculate the portfolio data and return it
}
