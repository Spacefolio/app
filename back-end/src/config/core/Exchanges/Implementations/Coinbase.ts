/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseExchange, IExchange, Exchange, ExchangeNames } from "../../../../core/entities";
import { Balances } from "../../../../core/entities/Integrations/Exchanges/Exchange";
import { IOrder } from "../../../../core/entities/Integrations/Order";
import { IDigitalAssetTransaction } from "../../../../core/entities/Integrations/Transaction";

export class Coinbase extends BaseExchange {
  checkIsFiat(symbol: string): boolean {
    throw new Error("Method not implemented.");
  }
  getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number> {
    throw new Error("Method not implemented.");
  }
  fetchOpenOrders(): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
  
  fetchBalances(): Promise<Balances> {
    throw new Error("Method not implemented.");
  }
  
  fetchTransactions(): Promise<IDigitalAssetTransaction[]> {
    throw new Error("Method not implemented.");
  }

  fetchOrders(): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }

  constructor() {
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
  }
}