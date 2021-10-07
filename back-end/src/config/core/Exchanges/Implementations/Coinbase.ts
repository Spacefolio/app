/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseExchange, IExchange, Exchange, ExchangeNames, IExchangeAccount } from "../../../../core/entities";
import { Balances, IExchangeAdapter } from "../../../../core/entities/Integrations/Exchanges/Exchange";
import { IOrder } from "../../../../core/entities/Integrations/Order";
import { IDigitalAssetTransaction } from "../../../../core/entities/Integrations/Transaction";

export class Coinbase extends BaseExchange {
  private exchangeAdapter: IExchangeAdapter;
  
  fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances> {
    throw new Error("Method not implemented.");
  }
  fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]> {
    throw new Error("Method not implemented.");
  }
  fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
  fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
  checkIsFiat(symbol: string): boolean {
    throw new Error("Method not implemented.");
  }

  getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number> {
    throw new Error("Method not implemented.");
  }

  constructor(exchangeAdapter: IExchangeAdapter) {
    const config: IExchange = {
      id: Exchange.COINBASE,
      name: <string>ExchangeNames.get(Exchange.COINBASE),
      logoUrl: `https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png`,
      requiredCredentials: {
        apiKey: true,
        secret: true,
        uid: false,
        login: false,
        password: false,
        twofa: false,
        privateKey: false,
        walletAddress: false,
        token: false
      }
    }
    super(config);
    this.exchangeAdapter = exchangeAdapter;
  }
}