import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";
import { IExchangeAccountPortfolioViewModel, portfolioViewModelFrom } from "./PortfolioPresenter";

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
	const metaportfolio: IExchangeAccountPortfolioViewModel = {
    name: 'All Portfolios',
    id: 'ALL',
    nickname: 'Metaportfolio',
    addedDate: new Date(),
    apiInfo: {
			apiKey: '',
			apiSecret: '',
			passphrase: '',
		},
    portfolioItems: [],
    profitPercentage: 0, 
    profitTotal: { USD: 0 },
    portfolioTotal: { USD: 0 }
  };

  return metaportfolio;
}

export default SyncPortfolioPresenter;


