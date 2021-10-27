import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";
import { IExchangeAccountPortfolioViewModel, portfolioViewModelFrom } from "./PortfolioPresenter";
import { createMetaportfolio } from "./SyncPortfolioPresenter";

class MetaportfolioPresenter implements IPresenter<IExchangeAccount[], IExchangeAccountPortfolioViewModel> {
  present(models: IExchangeAccount[]): IExchangeAccountPortfolioViewModel {

    const exchangeAccounts = models.map((model) => portfolioViewModelFrom(model));
		const metaportfolio = createMetaportfolio(exchangeAccounts);

    const viewModel: IExchangeAccountPortfolioViewModel = metaportfolio;

    return viewModel;
  }
}

export default MetaportfolioPresenter;