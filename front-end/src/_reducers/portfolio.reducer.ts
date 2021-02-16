import { portfolioConstants } from "../_constants";
import { IPortfolioData } from "../../../types";

interface IPortfolioAction {
  type: string;
  portfolioData: IPortfolioData[];
}

export function portfolio(
  state: any = {
    syncingPortfolio: false,
    recalculatingPortfolio: false,
    portfolioData: [],
  },
  action: IPortfolioAction
) {
  switch (action.type) {
    case portfolioConstants.SYNC_REQUEST:
      return {
        ...state,

        syncingPortfolio: true,
      };
    case portfolioConstants.SYNC_SUCCESS:
      return {
        ...state,
        portfolioData: action.portfolioData,
        syncingPortfolio: false,
      };
    case portfolioConstants.SYNC_FAILURE:
      return {
        ...state,
        syncingPortfolio: false,
      };

    case portfolioConstants.REFRESH_REQUEST:
      return {
        ...state,

        recalculatingPortfolio: true,
      };
    case portfolioConstants.REFRESH_SUCCESS:
      return {
        ...state,
        portfolioData: action.portfolioData,
        recalculatingPortfolio: false,
      };
    case portfolioConstants.REFRESH_FAILURE:
      return {
        ...state,
        recalculatingPortfolio: false,
      };

    default:
      return state;
  }
}
