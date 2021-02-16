import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import {
  IExchangeAccountRequest,
  exchangeType,
  IExchangeAccount,
} from "../../../types";
import ccxt, { Exchange } from "ccxt";

export const portfolioService = {
  get
};

async function get(userId: string, sync: boolean) {
  const user = await User.findById(userId).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  if (sync) { exchangeService.syncExchangeData(userId); }

  // TODO: calculate the portfolio data and return it
  return {};
}
