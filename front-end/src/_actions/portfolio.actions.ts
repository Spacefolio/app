import { portfolioConstants } from "../_constants";
import { portfolioService } from "../_services";
import { alertActions } from "./alert.actions";
import { IPortfolioDataView, ITransactionItemView } from "../../../types";

export const portfolioActions = {
  sync,
  refresh,
  getTransactions,
  getOpenOrders,
};

function sync() {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .syncPortfolio()
      .then((res: any) => {
        dispatch(success(res));
        dispatch(alertActions.success("Sync Complete"));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: portfolioConstants.SYNC_REQUEST };
  }
  function success(portfolioData: IPortfolioDataView[]) {
    return { type: portfolioConstants.SYNC_SUCCESS, portfolioData };
  }
  function failure(error: any) {
    return { type: portfolioConstants.SYNC_FAILURE, error };
  }
}

function refresh() {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .refreshPortfolio()
      .then((res: any) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: portfolioConstants.REFRESH_REQUEST };
  }
  function success(portfolioData: IPortfolioDataView[]) {
    return { type: portfolioConstants.REFRESH_SUCCESS, portfolioData };
  }
  function failure(error: any) {
    return { type: portfolioConstants.REFRESH_FAILURE, error };
  }
}

function getTransactions(exchangeID?: string) {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .getTransactionData(exchangeID)
      .then((res: any) => {
        dispatch(success(res));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: portfolioConstants.TRANSACTIONS_REQUEST };
  }
  function success(transactionData: ITransactionItemView[]) {
    return { type: portfolioConstants.TRANSACTIONS_SUCCESS, transactionData };
  }
  function failure(error: any) {
    return { type: portfolioConstants.TRANSACTIONS_FAILURE, error };
  }
}

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
        dispatch(alertActions.error(error.toString()));
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
