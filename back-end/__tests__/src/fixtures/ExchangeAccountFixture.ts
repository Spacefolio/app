import faker from 'faker';
import { ExchangesConfiguration } from '../../../src/config/core/Exchanges';
import { Exchange, IExchangeAccount } from '../../../src/core/entities';
import { makeId } from '../../../src/data';

export default function makeFakeExchangeAccount (overrides: Partial<IExchangeAccount>): IExchangeAccount {
  const exchangeAccountParams: IExchangeAccount = {
    accountId: makeId(),
    exchange: ExchangesConfiguration.get(Exchange.COINBASE),
    credentials: {
      apiKey: faker.random.alphaNumeric(10),
      apiSecret: faker.random.alphaNumeric(10),
      passphrase: faker.random.alphaNumeric(10)
    },
    nickname: faker.random.word()
  };

  return { ...exchangeAccountParams, ...overrides };
}