import { IHoldingBalance } from "..";
import { IOrder } from "../Order";
import { IDigitalAssetTransaction } from "../Transaction";
import { IExchangeAccount } from "./ExchangeAccount";

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

export type Balances = { [assetId: string] : IHoldingBalance }

export interface IExchange {
  id: string,
  name: string,
  logoUrl: string,
  requiredCredentials: IRequiredExchangeCredentials;
}

export abstract class BaseExchange implements IExchange {
  protected account: IExchangeAccount | undefined;

	setAccount(exchangeAccount: IExchangeAccount): void {
		this.account = exchangeAccount;
	}
  
  abstract getRate(base: string, quote: string, timestamp?: number): Promise<number>;
	abstract fetchBalances(): Promise<Balances>;
	abstract fetchTransactions(): Promise<IDigitalAssetTransaction[]>;
	abstract fetchOrders(): Promise<IOrder[]>;
  abstract fetchOpenOrders(): Promise<IOrder[]>;

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