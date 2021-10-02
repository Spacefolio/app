/* eslint-disable @typescript-eslint/no-unused-vars */
import faker from "faker";
import { BaseExchange, IExchange, Exchange, ExchangeNames, Action, IHoldingBalance } from "../../../../core/entities";
import { Balances } from "../../../../core/entities/Integrations/Exchanges/Exchange";
import { IOrder, OrderStatus } from "../../../../core/entities/Integrations/Order";
import { ONE_DAY } from "../../../../core/entities/Integrations/Timeslice";
import { IDigitalAssetTransaction } from "../../../../core/entities/Integrations/Transaction";

export class FakeExchange extends BaseExchange {
  checkIsFiat(symbol: string): boolean {
    return symbol.toUpperCase() === 'USD';
  }
  
  async getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number> {
    if (baseSymbol.toUpperCase() === 'BTC') return 15000;
    return 1;
  }
  
  async fetchOpenOrders(): Promise<IOrder[]> {
    const orders: IOrder[] = [{
      timestamp: faker.date.recent().valueOf(),
      datetime: faker.date.recent().toDateString(),
      baseAsset: 'bitcoin',
      quoteAsset: 'usd',
      baseSymbol: 'BTC',
      quoteSymbol: 'USD',
      side: Action.SELL,
      price: 15000,
      amount: 5,
      filled: 0,
      remaining: 5,
      cost: 75000,
      fee: {
        assetId: 'bitcoin',
        rate: faker.datatype.number(),
        cost: 0
      },
      status: OrderStatus.OPEN
    }];

    return orders;
  }
  
  async fetchBalances(): Promise<Balances> {
    const holdingBalance: IHoldingBalance = {
      free: 0,
      used: 5,
      total: 5
    };
    const balances: { [assetId: string]: IHoldingBalance } = {};
    balances['bitcoin'] = holdingBalance; 
    return balances;
  }
  
  async fetchTransactions(): Promise<IDigitalAssetTransaction[]> {
    return [];
  }

  async fetchOrders(): Promise<IOrder[]> {
    const orders: IOrder[] = [{
      timestamp: Date.now() - ONE_DAY * 1,
      datetime: faker.date.recent().toDateString(),
      baseAsset: 'bitcoin',
      baseSymbol: 'BTC',
      quoteAsset: 'usd',
      quoteSymbol: 'USD',
      side: Action.SELL,
      price: 15000,
      amount: 5,
      filled: 5,
      remaining: 0,
      cost: 75000,
      fee: {
        assetId: 'bitcoin',
        rate: faker.datatype.number(),
        cost: 0
      },
      status: OrderStatus.CLOSED
    }];

    return orders;
  }

  constructor() {
    const config: IExchange = {
      id: Exchange.FAKE,
      name: <string>ExchangeNames.get(Exchange.FAKE),
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