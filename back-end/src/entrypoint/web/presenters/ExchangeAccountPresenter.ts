import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount, IExchangeCredentials } from "../../../core/entities";

export interface IExchangeAccountViewModel {
  name: string;
  id: string;
  nickname: string;
  exchangeType: string;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: IExchangeCredentials
}

class ExchangeAccountPresenter implements IPresenter<IExchangeAccount, IExchangeAccountViewModel> {
  present(model: IExchangeAccount): IExchangeAccountViewModel {
    const viewModel: IExchangeAccountViewModel = {
      name: model.name,
      id: model.accountId,
      nickname: model.nickname,
      exchangeType: model.exchange.id,
      addedDate: model.createdAt,
      logoUrl: model.exchange.logoUrl,
      apiInfo: model.credentials
    };

    return viewModel;
  }
}

export default ExchangeAccountPresenter;