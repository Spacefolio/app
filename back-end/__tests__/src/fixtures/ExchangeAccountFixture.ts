import faker from 'faker';
import { ExchangesConfiguration } from '../../../src/config/core/Exchanges';
import { Action, Exchange, IExchangeAccount, IHolding } from '../../../src/core/entities';
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
        averageSellPrice: { USD: faker.datatype.number() }
      }
    }]
  }];

  const transactions: IDigitalAssetTransaction[] = [{
    type: TransactionType.DEPOSIT,
    timestamp: faker.date.recent().valueOf(),
    address: faker.random.alphaNumeric(20),
    amount: faker.datatype.number(),
    currency: faker.random.alpha({ count: 3 }),
    status: TransactionStatus.OK,
    fee: {
      currency: faker.random.alpha({ count: 3 }),
      rate: faker.datatype.number(),
      cost: faker.datatype.number() 
    }
  }];

  const exchangeAccountParams: IExchangeAccount = {
    accountId: makeId(),
    exchange: ExchangesConfiguration.get(Exchange.COINBASE),
    credentials: {
      apiKey: faker.random.alphaNumeric(10),
      apiSecret: faker.random.alphaNumeric(10),
      passphrase: faker.random.alphaNumeric(10)
    },
    nickname: faker.random.word(),
    holdings,
    transactions
  };

  return { ...exchangeAccountParams, ...overrides };
}