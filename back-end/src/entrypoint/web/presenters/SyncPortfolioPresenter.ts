import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";
import { IExchangeAccountPortfolioViewModel, portfolioViewModelFrom } from "./PortfolioPresenter";

export interface IPortfolioViewModel {
  exchangeAccounts: IExchangeAccountPortfolioViewModel[];
}

class SyncPortfolioPresenter implements IPresenter<IExchangeAccount[], IPortfolioViewModel> {
  present(models: IExchangeAccount[]): IPortfolioViewModel {

		let exchangeAccounts: IExchangeAccountPortfolioViewModel[] = [];

		if (models && models.length > 0) {
			exchangeAccounts = models.map((model) => portfolioViewModelFrom(model));			
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


