import { portfolioConstants } from "../_constants";
import { portfolioService } from "../_services";
import { alertActions } from "./alert.actions";
import { IPortfolioData } from "../../../types";

export const portfolioActions = {
  sync,
  refresh
};

function sync() {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .syncPortfolio(true)
      .then((res: any) => {
        console.log('sync', res)
        dispatch(success(res));
        dispatch(alertActions.success("Sync Complete"));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: portfolioConstants.SYNC_REQUEST};
  }
  function success(portfolioData: IPortfolioData) {
    return { type: portfolioConstants.SYNC_SUCCESS,  portfolioData};
  }
  function failure(error: any) {
    return { type: portfolioConstants.SYNC_FAILURE, error };
  }
}

function refresh() {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .syncPortfolio(false)
      .then((res: any) => {
        console.log('refresh', res)
        dispatch(success(res));
        dispatch(alertActions.success("Refresh Complete"));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request() {
    return { type: portfolioConstants.REFRESH_REQUEST};
  }
  function success(portfolioData: IPortfolioData) {
    return { type: portfolioConstants.REFRESH_SUCCESS, portfolioData };
  }
  function failure(error: any) {
    return { type: portfolioConstants.REFRESH_FAILURE, error };
  }
}