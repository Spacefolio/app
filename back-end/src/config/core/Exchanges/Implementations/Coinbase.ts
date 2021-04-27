import { BaseExchange, IExchange, Exchange, ExchangeNames } from "../../../../core/entities";

export class Coinbase extends BaseExchange {
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