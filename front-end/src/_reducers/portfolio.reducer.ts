import { portfolioConstants } from "../_constants";
import { IPortfolioDataView, ITransactionItemView } from "../../../types";

interface IPortfolioAction {
  type: string;
  portfolioData: IPortfolioDataView[];
  transactionData: ITransactionItemView[];
}

export function portfolio(
  state: any = {
    syncingPortfolio: false,
    recalculatingPortfolio: false,
    portfolioData: [],
    transactionData: [],
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


      case portfolioConstants.TRANSACTIONS_REQUEST:
      return {
        ...state,
      };
    case portfolioConstants.TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactionData: action.transactionData,
      };
    case portfolioConstants.TRANSACTIONS_FAILURE:
      return {
        ...state,
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
