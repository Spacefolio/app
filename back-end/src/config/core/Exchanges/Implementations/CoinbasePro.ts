/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseExchange, IExchange, Exchange, ExchangeNames, IExchangeAccount } from "../../../../core/entities";
import { Balances } from "../../../../core/entities/Integrations/Exchanges/Exchange";
import { IOrder } from "../../../../core/entities/Integrations/Order";
import { IDigitalAssetTransaction } from "../../../../core/entities/Integrations/Transaction";
import { IExchangeAdapter } from "../ExchangeAdapter";

export class CoinbasePro extends BaseExchange {
  private exchangeAdapter: IExchangeAdapter;
  
  async fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances> {
    const balances = await this.exchangeAdapter.fetchBalances(exchangeAccount);
    return balances;
  }

  async fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]> {
    const transactions = await this.exchangeAdapter.fetchTransactions(exchangeAccount);
    return transactions;
  }

  async fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const orders = await this.exchangeAdapter.fetchOrders(exchangeAccount);
    return orders;
  }

  async fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const openOrders = await this.exchangeAdapter.fetchOpenOrders(exchangeAccount);
    return openOrders;
  }

  async checkIsFiat(exchangeAccount: IExchangeAccount, symbol: string): Promise<boolean> {
    const isFiat = await this.exchangeAdapter.checkIsFiat(exchangeAccount, symbol);
    return isFiat;
  }

  async getRate(exchangeAccount: IExchangeAccount, baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined> {
    const rate = await this.exchangeAdapter.getRate(exchangeAccount, baseSymbol, quoteSymbol, timestamp);
    return rate;
  }

  constructor(exchangeAdapter: IExchangeAdapter) {
    const config: IExchange = {
      id: Exchange.COINBASEPRO,
      name: <string>ExchangeNames.get(Exchange.COINBASEPRO),
      logoUrl: `https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png`,
      requiredCredentials: {
        apiKey: true,
        secret: true,
        uid: false,
        login: false,
        password: true,
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