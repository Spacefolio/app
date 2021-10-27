import { IPresenter } from '../../core/definitions';
import { ExchangeAccountPresenter, MetaportfolioPresenter, PortfolioPresenter, SyncPortfolioPresenter } from '../../entrypoint/web/presenters';

class PresentersConfiguration {
	static getExchangeAccountPresenter(): IPresenter {
		return new ExchangeAccountPresenter();
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
