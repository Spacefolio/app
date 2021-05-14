/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseExchange, Exchange, IExchangeCredentials } from "../../../src/core/entities";
import { Balances, ExchangeNames, IExchange } from "../../../src/core/entities/Integrations/Exchanges/Exchange";
import { IOrder } from "../../../src/core/entities";
import { IDigitalAssetTransaction } from "../../../src/core/entities/Integrations/Transaction";

async function verifyCredentials(exchange: Exchange, credentials: IExchangeCredentials): Promise<boolean> {
  return true;
}

function getExchange(exchange: Exchange): BaseExchange {
  return new FakeExchange();
}

class FakeExchange extends BaseExchange {
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
  
  async fetchBalances(): Promise<Balances> {
    const balances: Balances = {};
    return balances;
  }
  
  async fetchTransactions(): Promise<IDigitalAssetTransaction[]> {
    return [];
  }

  async fetchOrders(): Promise<IOrder[]> {
    return [];
  }
}

export { verifyCredentials, getExchange };