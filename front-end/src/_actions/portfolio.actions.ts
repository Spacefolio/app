import { portfolioConstants } from "../_constants";
import { portfolioService } from "../_services";
import { alertActions } from "./alert.actions";
import { IPortfolioData } from "../../../types";

export const portfolioActions = {
  sync
};

function sync(sync: boolean) {
  return (dispatch: any) => {
    dispatch(request());
    portfolioService
      .syncPortfolio(sync)
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
    return { type: portfolioConstants.SYNC_REQUEST};
  }
  function success(portfolioData: IPortfolioData) {
    return { type: portfolioConstants.SYNC_SUCCESS,  };
  }
  function failure(error: any) {
    return { type: portfolioConstants.SYNC_FAILURE, error };
  }
}