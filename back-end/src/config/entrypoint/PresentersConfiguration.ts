import { IPresenter } from '../../core/definitions';
import { ExchangeAccountPresenter, ExchangeAccountsPresenter, MetaportfolioPresenter, PortfolioPresenter, SyncPortfolioPresenter } from '../../entrypoint/web/presenters';

class PresentersConfiguration {
	static getExchangeAccountPresenter(): IPresenter {
		return new ExchangeAccountPresenter();
	}

	static getExchangeAccountsPresenter(): IPresenter {
		return new ExchangeAccountsPresenter();
	}

	static getPortfolioPresenter(): IPresenter {
		return new PortfolioPresenter();
	}

	static getSyncPortfolioPresenter(): IPresenter {
		return new SyncPortfolioPresenter();
	}

  static getMetaportfolioPresenter(): IPresenter {
    return new MetaportfolioPresenter();
  }
}

export default PresentersConfiguration;
