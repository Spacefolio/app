import faker from 'faker';
import { ExchangesConfiguration } from '../../../src/config/core/Exchanges';
import { Action, Exchange, IExchangeAccount, IHolding, IOrder, ITimeslices, OrderStatus } from '../../../src/core/entities';
import { IDigitalAssetTransaction, TransactionStatus } from '../../../src/core/entities/Integrations/Transaction';
import { makeId } from '../../../src/data';

export default function makeFakeExchangeAccount (overrides: Partial<IExchangeAccount> = {}): IExchangeAccount {

  const holdings: IHolding[] = [{
    asset: {
      assetId: faker.random.alphaNumeric(7),
      symbol: faker.random.alpha({ count: 3 }),
      name: faker.random.alpha({ count: 10 }),
      image: faker.random.alpha({ count: 10 })
    },
    balance: { 
      free: faker.datatype.number(),
      used: faker.datatype.number(),
      total: faker.datatype.number()
    },
    price: { USD: faker.datatype.number() },
    value: { USD: faker.datatype.number() },
    total: {
      amount: {
        bought: faker.datatype.number(),
        sold: faker.datatype.number(),
        deposited: faker.datatype.number(),
        withdrawn: faker.datatype.number()
      },
      value: {
        bought: { USD: faker.datatype.number() },
        sold: { USD: faker.datatype.number() },
        deposited: { USD: faker.datatype.number() },
        withdrawn: { USD: faker.datatype.number() }
      },
      averageBuyPrice: { USD: faker.datatype.number() },
      averageSellPrice: { USD: faker.datatype.number() },
      fees: { USD: faker.datatype.number() }
    },
    snapshots: [{
      timestamp: faker.date.recent().valueOf(),
      price: { USD: faker.datatype.number() },
      amountHeld: faker.datatype.number(),
      valueHeld: { USD: faker.datatype.number() },
      action: Action.BUY,
      bought: { 
        amount: faker.datatype.number(),
        value: { USD: faker.datatype.number() }
      },
      total: {
        amount: {
          bought: faker.datatype.number(),
          sold: faker.datatype.number(),
          deposited: faker.datatype.number(),
          withdrawn: faker.datatype.number()
        },
        value: {
          bought: { USD: faker.datatype.number() },
          sold: { USD: faker.datatype.number() },
          deposited: { USD: faker.datatype.number() },
          withdrawn: { USD: faker.datatype.number() }
        },
        averageBuyPrice: { USD: faker.datatype.number() },
        averageSellPrice: { USD: faker.datatype.number() },
        fees: { USD: faker.datatype.number() },
      }
    },
    {
      timestamp: faker.date.recent().valueOf(),
      price: { USD: faker.datatype.number() },
      amountHeld: faker.datatype.number(),
      valueHeld: { USD: faker.datatype.number() },
      action: Action.BUY,
      bought: { 
        amount: faker.datatype.number(),
        value: { USD: faker.datatype.number() }
      },
      total: {
        amount: {
          bought: faker.datatype.number(),
          sold: faker.datatype.number(),
          deposited: faker.datatype.number(),
          withdrawn: faker.datatype.number()
        },
        value: {
          bought: { USD: faker.datatype.number() },
          sold: { USD: faker.datatype.number() },
          deposited: { USD: faker.datatype.number() },
          withdrawn: { USD: faker.datatype.number() }
        },
        averageBuyPrice: { USD: faker.datatype.number() },
        averageSellPrice: { USD: faker.datatype.number() },
        fees: { USD: faker.datatype.number() }
      }
    }]
  }];

  const transactions: IDigitalAssetTransaction[] = [{
    type: Action.DEPOSIT,
    timestamp: faker.date.recent().valueOf(),
    address: faker.random.alphaNumeric(20),
    amount: faker.datatype.number(),
    assetId: faker.random.alpha({ count: 3 }),
    status: TransactionStatus.OK,
    fee: {
      assetId: faker.random.alpha({ count: 3 }),
      rate: faker.datatype.number(),
      cost: faker.datatype.number() 
    }
  }];

  const orders: IOrder[] = [{
    timestamp: faker.date.recent().valueOf(),
    datetime: faker.date.recent().toDateString(),
    baseAsset: faker.random.alpha({ count: 3 }),
    quoteAsset: faker.random.alpha({ count: 3}),
    side: Action.BUY,
    price: faker.datatype.number(),
    amount: faker.datatype.number(),
    filled: faker.datatype.number(),
    remaining: faker.datatype.number(),
    cost: faker.datatype.number(),
    fee: {
      assetId: faker.random.alpha({ count: 3 }),
      rate: faker.datatype.number(),
      cost: faker.datatype.number()
    },
    status: OrderStatus.CLOSED
  }];

  const openOrders: IOrder[] = [{
    timestamp: faker.date.recent().valueOf(),
    datetime: faker.date.recent().toDateString(),
    baseAsset: faker.random.alpha({ count: 3 }),
    quoteAsset: faker.random.alpha({ count: 3}),
    side: Action.BUY,
    price: faker.datatype.number(),
    amount: faker.datatype.number(),
    filled: faker.datatype.number(),
    remaining: faker.datatype.number(),
    cost: faker.datatype.number(),
    fee: {
      assetId: faker.random.alpha({ count: 3 }),
      rate: faker.datatype.number(),
      cost: faker.datatype.number()
    },
    status: OrderStatus.OPEN
  }];

  const dailyTimeslices: ITimeslices = {};
  const hourlyTimeslices: ITimeslices = {};

  const exchangeAccountParams: IExchangeAccount = {
    accountId: makeId(),
    exchange: ExchangesConfiguration.get(Exchange.COINBASE),
    credentials: {
      apiKey: faker.random.alphaNumeric(10),
      apiSecret: faker.random.alphaNumeric(10),
      passphrase: faker.random.alphaNumeric(10)
    },
    nickname: faker.random.word(),
    orders,
    openOrders,
    dailyTimeslices,
    hourlyTimeslices,
    holdings,
    transactions,
    lastSynced: new Date(0) 
  };

  return { ...exchangeAccountParams, ...overrides };
}