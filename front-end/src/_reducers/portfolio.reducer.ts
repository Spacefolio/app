import { portfolioConstants } from "../_constants";
import { IPortfolioData } from "../../../types";

interface IPortfolioAction {
  type: string;
  porfolioData: IPortfolioData;
}

export function portfolio(
  state: any = {
    exchanges: [],
    exchangeRef: [],
    syncingPortfolio: false,
    recalculatingPortfolio: false,
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
        portfolioData: action.porfolioData,
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
        portfolioData: action.porfolioData,
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
