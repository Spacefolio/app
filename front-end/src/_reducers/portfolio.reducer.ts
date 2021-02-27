import { portfolioConstants } from "../_constants";
import {
  IOpenOrderItemView,
  IPortfolioDataView,
  ITransactionItemView,
} from "../../../types";

interface IPortfolioAction {
  type: string;
  portfolioData: IPortfolioDataView[];
  // transactionData: ITransactionItemView[];
  openOrdersData: IOpenOrderItemView[];
  exchangeID: string;
}
export interface IPortfolioState {
  syncingPortfolio: boolean;
  recalculatingPortfolio: boolean;
  portfolioData: IPortfolioDataView[];
  filteredPortfolioData?: IPortfolioDataView;
  filterId: string;
}

const FilterPortfolio = (
  exchangeID: string,
  portfolioData: IPortfolioDataView[]
) => {
  return exchangeID != ""
    ? portfolioData.filter((portfolio: IPortfolioDataView) => {
        console.log("function", portfolio.id, exchangeID, portfolioData[0]);
        return portfolio.id == exchangeID;
      })[0]
    : portfolioData[0];
};

let Portfolio = JSON.parse(localStorage.getItem("Portfolio"));


export function portfolio(
  state: IPortfolioState = {
    syncingPortfolio: false,
    recalculatingPortfolio: false,
    portfolioData: Portfolio ? Portfolio : [],
    filteredPortfolioData: (Portfolio && FilterPortfolio('', Portfolio)),
    filterId: "",
  },
  action: IPortfolioAction
) {
  switch (action.type) {
    case portfolioConstants.SYNC_REQUEST:
      return {
        ...state,
        // filterId: '',
        syncingPortfolio: true,
      };
    case portfolioConstants.SYNC_SUCCESS:
      return {
        ...state,
        portfolioData: action.portfolioData,
        syncingPortfolio: false,
        filteredPortfolioData: FilterPortfolio(
          state.filterId,
          action.portfolioData
        ),
      };
    case portfolioConstants.SYNC_FAILURE:
      return {
        ...state,
        syncingPortfolio: false,
      };

    // case portfolioConstants.TRANSACTIONS_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case portfolioConstants.TRANSACTIONS_SUCCESS:
    //   return {
    //     ...state,
    //     transactionData: action.transactionData,
    //   };
    // case portfolioConstants.TRANSACTIONS_FAILURE:
    //   return {
    //     ...state,
    //   };

    case portfolioConstants.OPENORDERS_REQUEST:
      return {
        ...state,
      };
    case portfolioConstants.OPENORDERS_SUCCESS:
      return {
        ...state,
        openOrdersData: action.openOrdersData,
      };
    case portfolioConstants.OPENORDERS_FAILURE:
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
        filteredPortfolioData: FilterPortfolio(
          state.filterId,
          action.portfolioData
        ),
        recalculatingPortfolio: false,
      };
    case portfolioConstants.REFRESH_FAILURE:
      return {
        ...state,
        recalculatingPortfolio: false,
      };
    case portfolioConstants.FILTER_PORTFOLIOS:
      return {
        ...state,
        filterId: action.exchangeID,
        filteredPortfolioData: FilterPortfolio(
          action.exchangeID,
          state.portfolioData
        ),
      };

    default:
      return state;
  }
}
