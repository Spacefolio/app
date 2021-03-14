import { portfolioConstants } from "../_constants";
import { portfolioService } from "../_services";
import { alertActions } from "./alert.actions";
import { IPortfolioDataView, ITransactionItemView } from "../../../types";

export const portfolioActions = {
  sync,
  refresh,
  getOpenOrders,
  FilterPortfolio,
  SetFilteredPortfolioData,
};

function sync() {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .syncPortfolio()
      .then((res: any) => {
        dispatch(success(res));
        dispatch(refresh("ALL"));
        dispatch(alertActions.success("Sync Complete"));
      })
      .catch((error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.message));
      });
  };

  function request() {
    return { type: portfolioConstants.SYNC_REQUEST };
  }
  function success(portfolioData: IPortfolioDataView[]) {
    return { type: portfolioConstants.SYNC_SUCCESS, portfolioData };
  }
  function failure() {
    return { type: portfolioConstants.SYNC_FAILURE };
  }
}

function refresh(portfolioId: string, manual: boolean = false) {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .refreshPortfolio(portfolioId, manual)
      .then((res: any) => {
        dispatch(SetFilteredPortfolioData(res));
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.message));
      });
  };

  function request() {
    return { type: portfolioConstants.REFRESH_REQUEST };
  }
  function success(portfolioData: IPortfolioDataView[]) {
    return { type: portfolioConstants.REFRESH_SUCCESS, portfolioData };
  }
  function failure() {
    return { type: portfolioConstants.REFRESH_FAILURE };
  }
}

// function getTransactions(exchangeID?: string) {
//   return (dispatch: any) => {
//     dispatch(request());
//     portfolioService
//       .getTransactionData(exchangeID)
//       .then((res: any) => {
//         dispatch(success(res));
//       })
//       .catch((error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       });
//   };

//   function request() {
//     return { type: portfolioConstants.TRANSACTIONS_REQUEST };
//   }
//   function success(transactionData: ITransactionItemView[]) {
//     return { type: portfolioConstants.TRANSACTIONS_SUCCESS, transactionData };
//   }
//   function failure(error: any) {
//     return { type: portfolioConstants.TRANSACTIONS_FAILURE, error };
//   }
// }

function getOpenOrders(exchangeID?: string) {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .getOpenOrdersData(exchangeID)
      .then((res: any) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.message));
      });
  };

  function request() {
    return { type: portfolioConstants.OPENORDERS_REQUEST };
  }
  function success(openOrdersData: ITransactionItemView[]) {
    return { type: portfolioConstants.OPENORDERS_SUCCESS, openOrdersData };
  }
  function failure(error: any) {
    return { type: portfolioConstants.OPENORDERS_FAILURE, error };
  }
}

function FilterPortfolio(portfolioId: string) {
  return (dispatch: any) => {
    dispatch(portfolioActions.refresh(portfolioId));
    dispatch(request(portfolioId));
  };
  function request(portfolioId: string) {
    return { type: portfolioConstants.FILTER_ID, exchangeID: portfolioId };
  }
}

function SetFilteredPortfolioData(filteredPortfolioData: IPortfolioDataView) {
  return { type: portfolioConstants.FILTER_DATA, filteredPortfolioData };
}
