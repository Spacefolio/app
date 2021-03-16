import { portfolioConstants } from '../_constants';
import {
	ICachedPortfolioDataView,
	IOpenOrderItemView,
	IPortfolioDataView,
	ITransactionItemView,
} from '../../../types';
import { getCachedPortfolios } from '../_helpers/caching';

interface IPortfolioAction {
	type: string;
	portfolioData: IPortfolioDataView;
	portfoliosData: IPortfolioDataView[];
	openOrdersData: IOpenOrderItemView[];
	exchangeID: string;
}
export interface IPortfolioState {
	syncingPortfolio: boolean;
	recalculatingPortfolio: boolean;
	portfoliosData: IPortfolioDataView[];
}

const CachedPortfolios = getCachedPortfolios();

export function portfolio(
	state: IPortfolioState = {
		syncingPortfolio: false,
		recalculatingPortfolio: false,
		portfoliosData: CachedPortfolios ? CachedPortfolios : [],
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
				portfoliosData: state.portfoliosData.map((item) =>
					action.portfolioData.id == item.id ? action.portfolioData : item
				),
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
				// filteredPortfolioData: action.filteredPortfolioData,
			};

		default:
			return state;
	}
}
