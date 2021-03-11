import { portfolioConstants } from "../_constants";
import {
  ICachedPortfolioDataView,
  IOpenOrderItemView,
  IPortfolioDataView,
  ITransactionItemView,
} from "../../../types";

interface IPortfolioAction {
  type: string;
  portfolioData: IPortfolioDataView[];
  openOrdersData: IOpenOrderItemView[];
  exchangeID: string;
  filteredPortfolioData: IPortfolioDataView;
}
export interface IPortfolioState {
  syncingPortfolio: boolean;
  recalculatingPortfolio: boolean;
  PortfolioData: IPortfolioDataView[];
  filterId: string;
  filteredPortfolioData: IPortfolioDataView;
}

const CachedPortfolios: ICachedPortfolioDataView[] = JSON.parse(
  localStorage.getItem("Portfolio")
);

var portfolioState,
  portfolioId: string,
  CachedFilteredPortfolio: IPortfolioDataView;

if (CachedPortfolios) {
  console.log("Cached Portfolios", CachedPortfolios);

  // portfolioState = JSON.parse(localStorage.getItem("portfolioConfig"));

  portfolioId = "ALL";

  CachedFilteredPortfolio = CachedPortfolios.filter(
    (item: IPortfolioDataView) => item.id == portfolioId
  )[0];
}

export function portfolio(
  state: IPortfolioState = {
    syncingPortfolio: false,
    recalculatingPortfolio: false,
    PortfolioData: CachedPortfolios ? CachedPortfolios : [],
    filteredPortfolioData: CachedFilteredPortfolio
      ? CachedFilteredPortfolio
      : null,
    filterId: portfolioId ? portfolioId : "ALL",
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

    // case portfolioConstants.OPENORDERS_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case portfolioConstants.OPENORDERS_SUCCESS:
    //   return {
    //     ...state,
    //     openOrdersData: action.openOrdersData,
    //   };
    // case portfolioConstants.OPENORDERS_FAILURE:
    //   return {
    //     ...state,
    //   };

    case portfolioConstants.REFRESH_REQUEST:
      return {
        ...state,
        recalculatingPortfolio: true,
      };
    case portfolioConstants.REFRESH_SUCCESS:
      return {
        ...state,
        recalculatingPortfolio: false,
      };
    case portfolioConstants.REFRESH_FAILURE:
      return {
        ...state,
        recalculatingPortfolio: false,
      };
    case portfolioConstants.FILTER_ID:
      return {
        ...state,
        filterId: action.exchangeID,
      };
    case portfolioConstants.FILTER_DATA:
      return {
        ...state,
        filteredPortfolioData: action.filteredPortfolioData,
      };

    default:
      return state;
  }
}
