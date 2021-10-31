import { BaseExchange, Exchange, IExchange, IExchangeCredentials } from "../../../core/entities";
import { VerifyCredentialsHandler } from "../../../core/use-cases/integration/exchangeAccount/addExchangeAccount/AddExchangeAccount";
import CcxtExchangeAdapter from "./CcxtExchangeAdapter";
import CcxtService from "./CcxtService";
import { Coinbase } from "./Implementations/Coinbase";
import { CoinbasePro } from "./Implementations/CoinbasePro";
import { FakeExchange } from "./Implementations/FakeExchange";

class ExchangesConfiguration {
  static exchanges: Map<Exchange, BaseExchange> = new Map<Exchange, BaseExchange>([
    [Exchange.FAKE, new FakeExchange()],
    [Exchange.COINBASE, new Coinbase(new CcxtExchangeAdapter())],
    [Exchange.COINBASEPRO, new CoinbasePro(new CcxtExchangeAdapter())]
  ]);

  static get(exchange: Exchange): BaseExchange {
    return <BaseExchange>ExchangesConfiguration.exchanges.get(exchange);
  }

  static getAvailableExchanges(): IExchange[] {
    const availableExchanges: IExchange[] = [];
    ExchangesConfiguration.exchanges.forEach((value: BaseExchange, key: Exchange) => {
      if (key === Exchange.FAKE) {
        return;
      }
      availableExchanges.push(value as IExchange);
    });

    return availableExchanges;
  }

  static getVerifyCredentials(): VerifyCredentialsHandler {
    return ExchangesConfiguration.verifyCredentials;
  }

  private static async verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
    return await CcxtService.verifyCredentials(exchange, credentials);
  }
}

export default ExchangesConfiguration;