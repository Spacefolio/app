import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount, IHolding } from "../../../core/entities";

export interface IExchangeAccountPortfolioViewModel {
	name: string;
	id: string;
	nickname: string;
	addedDate: Date | string;
	exchangeType?: string;
	apiInfo: {
		apiKey: string;
		secret: string;
		password: string;
		uid: string;
		login: string;
		privateKey: string;
		walletAddress: string;
		token: string;
		twofa: string;
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
	totalInvested: { all: number; h24: number };
	totalFees: number;
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
  
  const portfolioItems = model.holdings.map((holding) => extractPortfolioItemsFrom(holding));

	let profitPercentage = 0;
	let totalInvested = 0;
	let totalProfit = 0;
	let portfolioTotal = 0;

	for (const item of portfolioItems) {
		totalInvested += item.totalInvested.all;
		totalProfit += item.profitTotal.all;
		portfolioTotal += item.value.USD;
	}

	profitPercentage = (totalProfit / totalInvested ?? 1) * 100;
  
  const viewModel: IExchangeAccountPortfolioViewModel = {
    name: model.name,
    id: model.accountId,
    nickname: model.nickname,
    exchangeType: model.exchange.id,
    addedDate: model.createdAt,
    logoUrl: model.exchange.logoUrl,
    apiInfo: {
      apiKey: model.credentials.apiKey || '',
      secret: model.credentials.secret || '',
      password: model.credentials.password || '',
			uid: model.credentials.uid || '',
			login: model.credentials.login || '',
			privateKey: model.credentials.privateKey || '',
			walletAddress: model.credentials.walletAddress || '',
			token: model.credentials.token || '',
			twofa: model.credentials.twofa || ''
    },
    portfolioItems,
    profitPercentage: profitPercentage, 
    profitTotal: { USD: totalProfit },
    portfolioTotal: { USD: portfolioTotal }
  };

  return viewModel;
}

export function extractPortfolioItemsFrom(holding: IHolding): IPortfolioItemView {
  const valueInvested = holding.total.value.bought.USD + holding.total.value.deposited.USD;
  const valueReceived = holding.total.value.sold.USD + holding.total.value.withdrawn.USD;
  const totalProfit = valueReceived - valueInvested + holding.value.USD;
  const profitPercentage = (totalProfit/valueInvested)*100;
  const portfolioItemView: IPortfolioItemView = {
    asset: {
      assetId: holding.asset.assetId,
      name: holding.asset.name,
      symbol: holding.asset.symbol.toUpperCase(),
      logoUrl: holding.asset.image
    },
    amount: holding.balance.total,
    value: { USD: holding.value.USD },
    currentPrice: holding.price.USD,
    profitTotal: { all: totalProfit, h24: totalProfit },
    profitPercentage: { all: profitPercentage, h24: profitPercentage},
		totalInvested: { all: valueInvested, h24: valueInvested },
		totalFees: holding.total.fees.USD,
    sparkline: holding.asset.sparkline || []
  }

  return portfolioItemView;
}

class PortfolioPresenter implements IPresenter<IExchangeAccount, IExchangeAccountPortfolioViewModel> {
  present(model: IExchangeAccount): IExchangeAccountPortfolioViewModel {
    const viewModel: IExchangeAccountPortfolioViewModel = portfolioViewModelFrom(model);
    return viewModel;
  }
}

export default PortfolioPresenter;