import { exchangeConstants } from "../_constants";
import { IExchangeAccount } from "../../../types";

interface IExchangeAction {
  type: string;
  exchanges?: IExchangeAccount[];

  id?: string;
  error?: string;
  exchangeAccount?: any;
}

interface IExchangeAccountState extends IExchangeAccount {
  deleting?: string;
}

export function exchanges(
  state: any = { exchanges: [], exchangeRef: [], addingExchange: false },
  action: IExchangeAction
) {
  switch (action.type) {
    case exchangeConstants.GETALL_REQUEST:
      return {
        ...state,
      };
    case exchangeConstants.GETALL_SUCCESS:
      return {
        ...state,
        exchanges: action.exchanges,
      };
    case exchangeConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };

    case exchangeConstants.GETREF_REQUEST:
      return {
        ...state,
      };
    case exchangeConstants.GETREF_SUCCESS:
      return {
        ...state,
        exchangeRef: action.exchanges,
      };
    case exchangeConstants.GETREF_FAILURE:
      return {
        error: action.error,
      };

    case exchangeConstants.DELETE_REQUEST:
      return {
        ...state
      };
    case exchangeConstants.DELETE_SUCCESS:
      // remove deleted user from state
      console.log("reducer", action.id)
      return {
        ...state,
        exchanges: state.exchanges.filter(
          (item: IExchangeAccount) => {
            console.log(item.id)
            return item.id !== action.id
          }
        ),
      };
    case exchangeConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.exchanges.map(
          (exchange: IExchangeAccountState) => {
            if (exchange.id === action.id) {
              // make copy of user without 'deleting:true' property
              const { deleting, ...exchangeCopy } = exchange;
              // return copy of user with 'deleteError:[error]' property
              return { ...exchangeCopy, deleteError: action.error };
            }

            return exchange;
          }
        ),
      };

    case exchangeConstants.ADDNEW_REQUEST:
      return { ...state, addingExchange: true };
    case exchangeConstants.ADDNEW_SUCCESS:
      console.log(action.exchangeAccount);
      return {
        ...state,
        addingExchange: false,
        exchanges: [...state.exchanges, action.exchangeAccount],
      };
    case exchangeConstants.ADDNEW_FAILURE:
      return { ...state, addingExchange: false };

    case exchangeConstants.UPDATE_REQUEST:
      return { ...state, addingExchange: true };
    case exchangeConstants.UPDATE_SUCCESS:
      return {
        ...state,
        addingExchange: false,
        exchanges: state.exchanges.map((item: IExchangeAccount) => {
          if (item.id == action.exchangeAccount.id) {
            return action.exchangeAccount;
          } else {
            return item;
          }
        }),
      };
    case exchangeConstants.UPDATE_FAILURE:
      return { ...state };

    default:
      return state;
  }
}
