import { exchangeConstants } from "../_constants";
import { exchangeService } from "../_services";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers";
import {
  IExchangeAccount,
  IExchangeAccountRequest,
} from "../types/exchangeInterface";
import { exchanges } from "../_reducers/exchange.reducer";

export const exchangeActions = {
  addNew,
  getAll,
  getRef,
  update,
  delete: _delete,
};

function addNew(exchange: IExchangeAccountRequest) {
  return (dispatch: any) => {
    dispatch(request(exchange));

    exchangeService
      .addNew(exchange)
      .then((res: any) => {
        dispatch(success(res));
        dispatch(alertActions.success("Exchange Added"));
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      });
  };

  function request(exchange: IExchangeAccountRequest) {
    return { type: exchangeConstants.ADDNEW_REQUEST, exchange };
  }
  function success(exchangeAccount: IExchangeAccount) {
    return { type: exchangeConstants.ADDNEW_SUCCESS, exchangeAccount };
  }
  function failure(error: any) {
    return { type: exchangeConstants.ADDNEW_FAILURE, error };
  }
}

function update(exchange: IExchangeAccountRequest, id: string) {
  return (dispatch: any) => {
    dispatch(request(exchange));

    exchangeService.update(id, exchange).then(
      (res: any) => {
        dispatch(success(res));
        dispatch(alertActions.success("update successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(exchange: any) {
    return { type: exchangeConstants.UPDATE_REQUEST, exchange };
  }
  function success(exchangeAccount: IExchangeAccount) {
    return { type: exchangeConstants.UPDATE_SUCCESS, exchangeAccount };
  }
  function failure(error: any) {
    return { type: exchangeConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return (dispatch: any) => {
    dispatch(request());

    exchangeService
      .getAll()
      .then((exchanges) => dispatch(success(exchanges)))
      .catch((error) => dispatch(failure(error)));
  };

  function request() {
    return { type: exchangeConstants.GETALL_REQUEST };
  }
  function success(exchanges: any) {
    console.log(exchanges);
    return { type: exchangeConstants.GETALL_SUCCESS, exchanges };
  }
  function failure(error: any) {
    return { type: exchangeConstants.GETALL_FAILURE, error };
  }
}

function getRef() {
  return (dispatch: any) => {
    dispatch(request());

    exchangeService
      .getInfo()
      .then((exchanges) => dispatch(success(exchanges)))
      .catch((error) => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: exchangeConstants.GETREF_REQUEST };
  }
  function success(exchanges: any) {
    console.log(exchanges);
    return { type: exchangeConstants.GETREF_SUCCESS, exchanges };
  }
  function failure(error: any) {
    return { type: exchangeConstants.GETREF_FAILURE, error };
  }
}

function _delete(id: any) {
  return (dispatch: any) => {
    dispatch(request(id));
    exchangeService
      .delete(id)
      .then((res) => {
        console.log(res)
        dispatch(success(id))})
      .catch((error) => dispatch(failure(id, error.toString())));
  };

  function request(id: any) {
    return { type: exchangeConstants.DELETE_REQUEST, id };
  }
  function success(id: any) {
    return { type: exchangeConstants.DELETE_SUCCESS, id };
  }
  function failure(id: any, error: any) {
    return { type: exchangeConstants.DELETE_FAILURE, id, error };
  }
}
