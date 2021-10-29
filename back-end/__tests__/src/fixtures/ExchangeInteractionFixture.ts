/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseExchange, Exchange, IExchangeAccount, IExchangeCredentials } from "../../../src/core/entities";
import { Balances, ExchangeNames, IExchange } from "../../../src/core/entities/Integrations/Exchanges/Exchange";
import { IOrder } from "../../../src/core/entities";
import { IDigitalAssetTransaction } from "../../../src/core/entities/Integrations/Transaction";
import { FakeExchange } from "../../../src/config/core/Exchanges/Implementations/FakeExchange";

async function verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
  return true;
}

function getExchange(exchange: Exchange): BaseExchange {
  return new FakeExchange();
}

function getExchangeThatFails(exchange: Exchange): BaseExchange {
  return new FakeExchangeThatFails();
}

class FakeExchangeThatFails extends BaseExchange {
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

  async getRate(exchangeAccount: IExchangeAccount, base: string, quote: string, timestamp?: number): Promise<number> {
    return 1;
  }
  
  async fetchOpenOrders(): Promise<IOrder[]> {
    throw 'Failed to fetch open orders';
  }
  
  async fetchBalances(): Promise<Balances> {
    throw 'Failed to fetch balances';
  }
  
  async fetchTransactions(): Promise<IDigitalAssetTransaction[]> {
    throw 'Failed to fetch transactions';
  }

  async fetchOrders(): Promise<IOrder[]> {
    throw 'Failed to fetch orders';
  }
}

export { verifyCredentials, getExchange, getExchangeThatFails };