import { IHoldingBalance } from "..";
import { IOrder } from "../Order";
import { IDigitalAssetTransaction } from "../Transaction";
import { IExchangeAccount } from "./ExchangeAccount";

export enum Exchange {
  FAKE = "fake",
  BINANCE = "binance",
  BINANCEUS = "binanceus",
  COINBASE = "coinbase",
  COINBASEPRO = "coinbasepro",
  HITBTC = "hitbtc",
  KUCOIN = "kucoin"
}

export const ExchangeNames = new Map<Exchange, string>([
  [Exchange.FAKE, "Fake Exchange"],
  [Exchange.BINANCE, "Binance"],
  [Exchange.BINANCEUS, "Binance US"],
  [Exchange.COINBASE, "Coinbase"],
  [Exchange.COINBASEPRO, "Coinbase Pro"],
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

export type Balances = { [assetId: string] : IHoldingBalance }

export interface IExchange {
  id: string,
  name: string,
  logoUrl: string,
  requiredCredentials: IRequiredExchangeCredentials;
}

export abstract class BaseExchange implements IExchange {
  
  abstract getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined>;
	abstract fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances>;
	abstract fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]>;
	abstract fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;
  abstract fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;

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