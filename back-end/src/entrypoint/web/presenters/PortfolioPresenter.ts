import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";

export interface IExchangeAccountPortfolioViewModel {
	name: string;
	id: string;
	nickname: string;
	addedDate: Date | string;
	exchangeType?: string;
	apiInfo: {
		apiKey: string;
		apiSecret: string;
		passphrase: string;
	};
	logoUrl?: string;
	transactions?: ITransactionItemView[];
	openOrders?: IOpenOrderItemView[];
	portfolioItems: IPortfolioItemView[];
	profitPercentage: number;
	portfolioTotal: { USD: number };
	profitTotal: { USD: number };
}


export interface IPortfolioItemView {
	id?: string;
	asset: IAsset;
	amount: number;
	value: { USD: number };
	profitTotal: { all: number; h24: number };
	currentPrice: number;
	profitPercentage: { all: number; h24: number };
	sparkline: number[];
}

export interface IAsset {
	assetId: string;
	name?: string;
	symbol: string;
	logoUrl?: string;
}

export interface ITransactionItemView {
	id: string;
	exchangeName: string;
	symbol: string; //example 'BTC'
	quoteSymbol: string; //example 'USD'
	logoUrl: string;
	type: 'withdrawal' | 'deposit' | 'sell' | 'buy';
	date: number;
	amount: number;
	quoteAmount: number;
	price: number;
	value: number;
	fee: { cost: number; currency: string; rate: number };
}

export interface IOpenOrderItemView {
	id: string;
	exchangeName: string;
	symbol: string; //example 'BTC'
	quoteSymbol: string; //example 'USD'
	logoUrl: string;
	type: 'withdrawal' | 'deposit' | 'sell' | 'buy';
	date: number;
	amount: number;
	quoteAmount: number;
	price: number;
	value: number;
	fee: { cost: number; currency: string; rate: number };
}

export function portfolioViewModelFrom(model: IExchangeAccount): IExchangeAccountPortfolioViewModel {
  const viewModel: IExchangeAccountPortfolioViewModel = {
    name: model.name,
    id: model.accountId,
    nickname: model.nickname,
    exchangeType: model.exchange.id,
    addedDate: model.createdAt,
    logoUrl: model.exchange.logoUrl,
    apiInfo: {
      apiKey: model.credentials.apiKey || '',
      apiSecret: model.credentials.apiSecret || '',
      passphrase: model.credentials.passphrase || ''
    },
    portfolioItems: [],
    profitPercentage: 0, 
    profitTotal: { USD: 0 },
    portfolioTotal: { USD: 0 }
  };

  return viewModel;
}

class PortfolioPresenter implements IPresenter<IExchangeAccount, IExchangeAccountPortfolioViewModel> {
  present(model: IExchangeAccount): IExchangeAccountPortfolioViewModel {
    const viewModel: IExchangeAccountPortfolioViewModel = portfolioViewModelFrom(model);
    return viewModel;
  }
}

export default PortfolioPresenter;