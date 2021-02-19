import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";

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
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; })
    : mockPortfolioCalculationsFake();

  // TODO: calculate the portfolio data and return it
}