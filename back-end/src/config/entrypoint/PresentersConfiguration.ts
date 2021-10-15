import { IPresenter } from "../../core/definitions";
import { ExchangeAccountPresenter } from "../../entrypoint/web/presenters";

class PresentersConfiguration {
  static getExchangeAccountPresenter(): IPresenter {
    return new ExchangeAccountPresenter();
  }
}

export default PresentersConfiguration;