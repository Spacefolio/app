export interface IHolding {
	asset: IAsset;
	balance: IHoldingBalance;
	price: IValue;
	value: IValue;
	total: IHoldingTotal;
	snapshots: IHoldingSnapshot[];
}

export interface IAsset {
  assetId: string;
  symbol: string;
  name?: string;
  image?: string;
}

export interface IHoldingSnapshot {
	timestamp: number;
	price: IValue;
	amountHeld: number;
	valueHeld: IValue;
	action: Action;
	deposited?: IAmountAndValue;
	withdrew?: IAmountAndValue;
	bought?: IAmountAndValue;
	sold?: IAmountAndValue;
	total: IHoldingTotal;
}

export interface IAmountAndValue {
	amount: number;
	value: IValue;
}

export enum Action {
  BUY = 'buy',
  SELL = 'sell',
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}

export interface IHoldingBalance {
	free: number;
	used: number;
	total: number;
}

export interface IValue {
	USD: number;
}

export interface IHoldingTotal {
	amount: IAmounts;
	value: IValues;
	averageBuyPrice: IValue;
	averageSellPrice: IValue;
	fees: IValue;
}

export interface IValues {
	deposited: IValue;
	withdrawn: IValue;
	bought: IValue;
	sold: IValue;
}

export interface IAmounts {
	deposited: number;
	withdrawn: number;
	bought: number;
	sold: number;
}

export interface IExchangeAccount {
  name: string;
  accountId: string;
  exchange: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  holdings?: [IHolding];
  transactions?: [IDigitalAssetTransaction];
  orders?: [IOrder];
  openOrders?: [IOrder];
  lastSynced: Date;
}

export interface IOrder {
  timestamp: number;
  datetime: string;
  baseAsset: string;
  baseSymbol: string;
  quoteAsset: string;
  quoteSymbol: string;
  side: Action.BUY | Action.SELL;
  price: number;
  amount: number;
  filled: number;
  remaining: number;
  cost: number;
  status: OrderStatus;
  fee: IFee
}

export enum OrderStatus {
	OPEN = 'open',
	CLOSED = 'closed',
	CANCELED = 'canceled',
}


export interface IDigitalAssetTransaction extends ITransaction {
  address: string;
  amount: number;
  assetId: string;
  symbol: string;
  status: TransactionStatus;
  fee: IFee
}

export interface IFee {
  assetId: string;
  rate: number;
  cost: number;
}

export interface ITransaction {
  timestamp: number;
  datetime: string;
  address: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "ok";
  fee: IFee;
}

export enum TransactionStatus {
  PENDING = 'pending',
  OK = 'ok'
}

export interface IPortfolioItem {
  asset: IAsset;
  balance: { used: number; free: number; total: number };
  averageBuyPrice: { USD: number };
  averageSellPrice: { USD: number };
  amountSold: number;
  amountBought: number;
  holdingHistory: IHoldingSnapshot[];
}

export interface IExchangeAccountView {
  name: string;
  id: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  portfolioItems?: [IPortfolioItem];
  transactions?: [ITransaction];
}

export interface IExchangeAccountRequest {
  apiInfo: {
    apiKey?: string;
    apiSecret?: string;
    passphrase?: string;
    uid?: string;
    login?: string;
    twofa?: string;
    privateKey?: string;
    walletAddress?: string;
    token?: string;
  };
  name: string;
  nickname?: string;
  exchangeType: exchangeType;
  logoUrl?: string;
}

export interface IIntegrationInfo {
  id: exchangeType;
  name: string;
  logoUrl: string;
  requiredCredentials: {
    apiKey: boolean;
    secret: boolean;
    uid: boolean;
    login: boolean;
    password: boolean;
    twofa: boolean;
    privateKey: boolean;
    walletAddress: boolean;
    token: boolean;
  };
}

export type exchangeType =
  | "coinbasepro"
  | "binance"
  | "kucoin"
  | "binanceus"
  | "hitbtc"
  | "coinbase";