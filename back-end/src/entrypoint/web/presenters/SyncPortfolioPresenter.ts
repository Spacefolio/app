import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";
import { IExchangeAccountPortfolioViewModel, IPortfolioItemView, portfolioViewModelFrom } from "./PortfolioPresenter";

export interface IPortfolioViewModel {
  exchangeAccounts: IExchangeAccountPortfolioViewModel[];
}

class SyncPortfolioPresenter implements IPresenter<{ exchangeAccounts: IExchangeAccount[] }, IPortfolioViewModel> {
  present(models: { exchangeAccounts: IExchangeAccount[] }): IPortfolioViewModel {
		const accountModels = models.exchangeAccounts;
		let exchangeAccounts: IExchangeAccountPortfolioViewModel[] = [];

		if (accountModels && accountModels.length > 0) {
			exchangeAccounts = accountModels.map((model) => portfolioViewModelFrom(model));	
		}

		const metaportfolio = createMetaportfolio(exchangeAccounts);
		exchangeAccounts.unshift(metaportfolio);

    const viewModel: IPortfolioViewModel = {
      exchangeAccounts
    };

    return viewModel;
  }
}

export function createMetaportfolio(exchangeAccounts: IExchangeAccountPortfolioViewModel[]): IExchangeAccountPortfolioViewModel {
  const portfolioItems: Map<string, IPortfolioItemView> = new Map<string, IPortfolioItemView>();
  let totalProfit = 0;
  let totalInvested = 0;
  let totalProfitPercentage = 0;
  let portfolioTotal = 0;

  for (const exchangeAccount of exchangeAccounts) {
    mergePortfolioItems(portfolioItems, exchangeAccount.portfolioItems);
  }

  for (const portfolioItem of portfolioItems.values()) {
    portfolioTotal += portfolioItem.value.USD;
    totalProfit += portfolioItem.profitTotal.all;
    totalInvested += portfolioItem.totalInvested.all;
  }

  totalProfitPercentage = (totalProfit/totalInvested ?? 1) * 100;

	const metaportfolio: IExchangeAccountPortfolioViewModel = {
    name: 'All Portfolios',
    id: 'ALL',
    nickname: 'Metaportfolio',
    addedDate: new Date(),
    apiInfo: {
			apiKey: '',
			secret: '',
			password: '',
      uid: '',
      login: '',
      privateKey: '',
      walletAddress: '',
      token: '',
      twofa: ''
		},
    portfolioItems: Array.from(portfolioItems.values()),
    profitPercentage: totalProfitPercentage, 
    profitTotal: { USD: totalProfit },
    portfolioTotal: { USD: portfolioTotal }
  };

  return metaportfolio;
}

function mergePortfolioItems(portfolioItems: Map<string, IPortfolioItemView>, newPortfolioItems: IPortfolioItemView[]) {
  for (const portfolioItem of newPortfolioItems) {
    const existingItem = portfolioItems.get(portfolioItem.asset.assetId);
    if (existingItem !== undefined) {
      if (!existingItem.currentPrice) {
        existingItem.currentPrice = portfolioItem.currentPrice;
      }

      if (!existingItem.sparkline || existingItem.sparkline.length < 1) {
        existingItem.sparkline = portfolioItem.sparkline;
      }

      existingItem.amount += portfolioItem.amount;
      existingItem.profitTotal.all += portfolioItem.profitTotal.all;
      existingItem.profitTotal.h24 += portfolioItem.profitTotal.h24;
      existingItem.value.USD += portfolioItem.value.USD;
      existingItem.totalInvested.all += portfolioItem.totalInvested.all;
      existingItem.totalInvested.h24 += portfolioItem.totalInvested.h24;
      existingItem.totalFees += portfolioItem.totalFees;
      existingItem.profitPercentage.all = (existingItem.profitTotal.all / existingItem.totalInvested.all) * 100 || 0;
      existingItem.profitPercentage.h24 = (existingItem.profitTotal.h24 / existingItem.totalInvested.h24) * 100 || 0;
    } else {
      portfolioItems.set(portfolioItem.asset.assetId, portfolioItem);
    }
  }  
}

export default SyncPortfolioPresenter;


