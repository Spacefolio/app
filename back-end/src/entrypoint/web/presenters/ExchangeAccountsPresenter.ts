import { IExchangeAccountViewModel } from ".";
import { IPresenter } from "../../../core/definitions";
import { IExchangeAccount } from "../../../core/entities";

export type IExchangeAccountsViewModel = IExchangeAccountViewModel[];

class ExchangeAccountsPresenter implements IPresenter<IExchangeAccount[], IExchangeAccountsViewModel> {
  present(models: IExchangeAccount[]): IExchangeAccountsViewModel {
    const viewModels: IExchangeAccountViewModel[] = [];

    for (const model of models) {
      const viewModel: IExchangeAccountViewModel = {
        name: model.name,
        id: model.accountId,
        nickname: model.nickname,
        exchangeType: model.exchange.id,
        addedDate: model.createdAt,
        logoUrl: model.exchange.logoUrl,
        apiInfo: model.credentials
      };

      viewModels.push(viewModel);
    }
    
    return viewModels;
  }
}

export default ExchangeAccountsPresenter;