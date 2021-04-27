export enum Exchange {
  BINANCE = "binance",
  BINANCEUS = "binanceus",
  COINBASE = "coinbase",
  COINBASEPRO = "coinbasepro",
  HITBTC = "hitbtc",
  KUCOIN = "kucoin"
}

export const ExchangeNames = new Map<Exchange, string>([
  [Exchange.BINANCE, "Binance"],
  [Exchange.BINANCEUS, "BinanceUS"],
  [Exchange.COINBASE, "Coinbase"],
  [Exchange.COINBASEPRO, "CoinbasePro"],
  [Exchange.HITBTC, "HitBTC"],
  [Exchange.KUCOIN, "KuCoin"]
]);

export interface IRequiredExchangeCredentials {
  apiKey: boolean;
  secret: boolean;
  uid: boolean;
  login: boolean;
  password: boolean;
  twofa: boolean;
  privateKey: boolean;
  walletAddress: boolean;
  token: boolean;
}

export interface IExchange {
  id: string,
  name: string,
  logoUrl: string,
  requiredCredentials: IRequiredExchangeCredentials;
}

export abstract class BaseExchange implements IExchange {
  public readonly id: string;
  public readonly name: string;
  public readonly logoUrl: string;
  public readonly requiredCredentials: IRequiredExchangeCredentials;

  protected constructor(exchange: IExchange) {
    this.id = exchange.id;
    this.name = exchange.name;
    this.logoUrl = exchange.logoUrl;
    this.requiredCredentials = exchange.requiredCredentials;
  }
}