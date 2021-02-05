import { exchangeConstants } from "../_constants";
import { exchangeService } from "../_services";
import { alertActions } from ".";
import { history } from "../_helpers";

export const exchangeActions = {
  // addNew,
  getAll,
  // delete: _delete,
};

// function addNew(exchange: any) {
//   return (
//     dispatch: (arg0: {
//       type: string;
//       user?: any;
//       message?: any;
//       error?: any;
//     }) => void
//   ) => {
//     dispatch(request(exchange));

//     exchangeService.addNew(exchange).then(
//       (user) => {
//         dispatch(success());
//         dispatch(alertActions.success("Registration successful"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(user: any) {
//     return { type: exchangeConstants.REGISTER_REQUEST, user };
//   }
//   function success(user: undefined) {
//     return { type: exchangeConstants.REGISTER_SUCCESS, user };
//   }
//   function failure(error: any) {
//     return { type: exchangeConstants.REGISTER_FAILURE, error };
//   }
// }

function getAll() {
  return (
    dispatch: (arg0: { type: string; users?: any; error?: any }) => void
  ) => {
    dispatch(request());

    exchangeService.getAll().then(
      (exchanges) => dispatch(success(exchanges)),
      (error) => dispatch(failure(error.toString()))
    );
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

// function _delete(id: any) {
//   return (dispatch: (arg0: { type: string; id: any; error?: any }) => void) => {
//     dispatch(request(id));

//     exchangeService.delete(id).then(
//       (user) => dispatch(success(id)),
//       (error) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id: any) {
//     return { type: exchangeConstants.DELETE_REQUEST, id };
//   }
//   function success(id: any) {
//     return { type: exchangeConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id: any, error: any) {
//     return { type: exchangeConstants.DELETE_FAILURE, id, error };
//   }
// }
