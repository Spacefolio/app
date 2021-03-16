import { exchangeConstants } from '../_constants';
import { IExchangeAccountView, IIntegrationInfo } from '../../../types';
import { exchangeActions, portfolioActions } from '../_actions';
import { IRootState } from '.';

interface IExchangeAction {
	type: string;
	exchanges?: IExchangeAccountView[];
	id?: string;
	error?: string;
	exchangeAccount?: any;
}

export interface IExchangesState {
	exchanges: IExchangeAccountView[];
	integrationInfo: IIntegrationInfo[];
	addingExchange: boolean;
	addExchangeSuccess: boolean;
	updatingExchange: boolean;
}

interface IExchangeAccountState extends IExchangeAccountView {
	deleting?: string;
}

export function exchanges(
	state: IExchangesState = {
		exchanges: [],
		integrationInfo: [],
		addingExchange: false,
		addExchangeSuccess: false,
		updatingExchange: false,
	},
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
				...state,
			};
		case exchangeConstants.DELETE_SUCCESS:
			// remove deleted user from state
			console.log('reducer', action.id);
			return {
				...state,
				exchanges: state.exchanges.filter((item: IExchangeAccountView) => {
					return item.id !== action.id;
				}),
			};
		case exchangeConstants.DELETE_FAILURE:
			// remove 'deleting:true' property and add 'deleteError:[error]' property to user
			return {
				...state,
				items: state.exchanges.map((exchange: IExchangeAccountState) => {
					if (exchange.id === action.id) {
						// make copy of user without 'deleting:true' property
						const { deleting, ...exchangeCopy } = exchange;
						// return copy of user with 'deleteError:[error]' property
						return { ...exchangeCopy, deleteError: action.error };
					}

					return exchange;
				}),
			};

		case exchangeConstants.ADDNEW_REQUEST:
			return { ...state, addingExchange: true, addExchangeSuccess: false };
		case exchangeConstants.ADDNEW_SUCCESS:
			console.log(action.exchangeAccount);

			return {
				...state,
				addExchangeSuccess: true,
				addingExchange: false,
				exchanges: [...state.exchanges, action.exchangeAccount],
			};
		case exchangeConstants.ADDNEW_FAILURE:
			return { ...state, addingExchange: false, addExchangeSuccess: false };

		case exchangeConstants.UPDATE_REQUEST:
			return { ...state, updatingExchange: true };
		case exchangeConstants.UPDATE_SUCCESS:
			return {
				...state,
				updatingExchange: false,
				exchanges: state.exchanges.map((item: IExchangeAccountView) => {
					if (item.id == action.exchangeAccount.id) {
						return action.exchangeAccount;
					} else {
						return item;
					}
				}),
			};
		case exchangeConstants.UPDATE_FAILURE:
			return { ...state, updatingExchange: false };

		default:
			return state;
	}
}
