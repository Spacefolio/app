import faker from 'faker';
import { FakeExchange } from '../../../src/config/core/Exchanges/Implementations/FakeExchange';
import { Action, IExchangeAccount, IHolding, IOrder, ITimeslices, OrderStatus } from '../../../src/core/entities';
import { ITimeslice, ONE_DAY } from '../../../src/core/entities/Integrations/Timeslice';
import { IDigitalAssetTransaction, TransactionStatus } from '../../../src/core/entities/Integrations/Transaction';
import { makeId } from '../../../src/data';

export default function makeFakeExchangeAccount (overrides: Partial<IExchangeAccount> = {}): IExchangeAccount {

  const holdings: IHolding[] = [{
    asset: {
      assetId: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: faker.random.alpha({ count: 10 }),
      sparkline: faker.datatype.array(7*24) as number[]
    },
    balance: {
      free: 10,
      used: 0,
      total: 10
    },
    price: { USD: 10000 },
    value: { USD: 100000 },
    total: {
      amount: {
        bought: 10,
        sold: 0,
        deposited: 0,
        withdrawn: 0
      },
      value: {
        bought: { USD: 100000 },
        sold: { USD: 0 },
        deposited: { USD: 0 },
        withdrawn: { USD: 0 }
      },
      averageBuyPrice: { USD: 10000 },
      averageSellPrice: { USD: 0 },
      fees: { USD: 5 }
    },
    snapshots: [{
      timestamp: Date.now() - ONE_DAY * 5,
      price: { USD: 10000 },
      amountHeld: 5,
      valueHeld: { USD: 50000 },
      action: Action.BUY,
      bought: {
        amount: 5,
        value: { USD: 50000 }
      },
      total: {
        amount: {
          bought: 5,
          sold: 0,
          deposited: 0,
          withdrawn: 0
        },
        value: {
          bought: { USD: 50000 },
          sold: { USD: 0 },
          deposited: { USD: 0 },
          withdrawn: { USD: 0 }
        },
        averageBuyPrice: { USD: 10000 },
        averageSellPrice: { USD: 0 },
        fees: { USD: 2.5 },
      }
    },
    {
      timestamp: Date.now() - ONE_DAY * 3,
      price: { USD: 10000 },
      amountHeld: 10,
      valueHeld: { USD: 100000 },
      action: Action.BUY,
      bought: { 
        amount: 5,
        value: { USD: 50000 }
      },
      total: {
        amount: {
          bought: 10,
          sold: 0,
          deposited: 0,
          withdrawn: 0
        },
        value: {
          bought: { USD: 100000 },
          sold: { USD: 0 },
          deposited: { USD: 0 },
          withdrawn: { USD: 0 }
        },
        averageBuyPrice: { USD: 10000 },
        averageSellPrice: { USD: 0 },
        fees: { USD: 5 }
      }
    }]
  }];

  const transactions: IDigitalAssetTransaction[] = [{
    type: Action.DEPOSIT,
    timestamp: faker.date.recent().valueOf(),
    address: faker.random.alphaNumeric(20),
    amount: faker.datatype.number(),
    assetId: faker.random.alpha({ count: 7 }),
    symbol: faker.random.alpha({ count: 3 }),
    status: TransactionStatus.OK,
    fee: {
      assetId: faker.random.alpha({ count: 7 }),
      rate: faker.datatype.number(),
      cost: faker.datatype.number() 
    }
  }];

  const orders: IOrder[] = [{
    timestamp: Date.now() - ONE_DAY * 3,
    datetime: faker.date.recent().toDateString(),
    baseAsset: 'bitcoin',
    baseSymbol: 'BTC',
    quoteAsset: 'usd',
    quoteSymbol: 'USD',
    side: Action.BUY,
    price: 10000,
    amount: 5,
    filled: 5,
    remaining: 0,
    cost: 50002.50,
    fee: {
      assetId: 'usd',
      rate: faker.datatype.number(),
      cost: 2.5
    },
    status: OrderStatus.CLOSED
  },
  {
    timestamp: Date.now() - ONE_DAY * 2,
    datetime: faker.date.recent().toDateString(),
    baseAsset: 'bitcoin',
    baseSymbol: 'BTC',
    quoteAsset: 'usd',
    quoteSymbol: 'USD',
    side: Action.BUY,
    price: 10000,
    amount: 5,
    filled: 5,
    remaining: 0,
    cost: 50002.50,
    fee: {
      assetId: 'usd',
      rate: faker.datatype.number(),
      cost: 2.5
    },
    status: OrderStatus.CLOSED
  }];

  const openOrders: IOrder[] = [{
    timestamp: faker.date.recent().valueOf(),
    datetime: faker.date.recent().toDateString(),
    baseAsset: 'bitcoin',
    baseSymbol: 'BTC',
    quoteAsset: 'usd',
    quoteSymbol: 'USD',
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

  const dailyTimeslices: ITimeslices = new Map<number, ITimeslice>();
  const hourlyTimeslices: ITimeslices = new Map<number, ITimeslice>();

  const exchangeAccountParams: IExchangeAccount = {
    name: "Fake Exchange",
    accountId: makeId(),
    exchange: new FakeExchange(),
    credentials: {
      apiKey: faker.random.alphaNumeric(10),
      secret: faker.random.alphaNumeric(10),
      password: faker.random.alphaNumeric(10)
    },
    nickname: faker.random.word(),
    orders,
    openOrders,
    dailyTimeslices,
    hourlyTimeslices,
    holdings,
    transactions,
    lastSynced: new Date(0),
    createdAt: new Date(0)
  };

  return { ...exchangeAccountParams, ...overrides };
}