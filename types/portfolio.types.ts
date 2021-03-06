import { IHoldingSnapshot } from "../back-end/src/exchanges/exchange.model";
import { ITransaction } from "../back-end/src/transactions/transaction.model";
import { exchangeType } from "../types";

export interface IPortfolioDataView {
  name: string;
  id: string;
  nickname: string;
  addedDate: Date | string;
  exchangeType: exchangeType;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  logoUrl: string;
  orders: IOpenOrderItemView[];
  transactionViewItems: ITransactionItemView[];
  transactions: ITransaction[];
  openOrders: IOpenOrderItemView[];
  portfolioItems: IPortfolioItemView[];
  profitPercentage: { USD: number };
  portfolioTotal: { USD: number };
  profitTotal: { USD: number };
  holdingHistory: IHoldingSnapshot[];
}

export interface ICachedPortfolioDataView {
  name: string;
  id: string;
  nickname: string;
  addedDate: Date | string;
  exchangeType: exchangeType;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  logoUrl: string;
  orders: IOpenOrderItemView[];
  transactionViewItems: ITransactionItemView[];
  transactions: ITransaction[];
  openOrders: IOpenOrderItemView[];
  portfolioItems: IPortfolioItemView[];
  profitPercentage: { USD: number };
  portfolioTotal: { USD: number };
  profitTotal: { USD: number };
  holdingHistory: IHoldingSnapshot[];
  lastRefresh: number;
}

export interface IPortfolioItemView {
  id?: string;
  asset: IAsset;
  amount: number;
  value: { USD: number };
  profitTotal: { all: number; h24: number };
  currentPrice: number;
  profitPercentage: { all: number; h24: number };
}

export interface IAsset {
  assetId: string;
  name?: string;
  symbol: string;
  logoUrl?: string;
}

export interface ITransactionItemView {
  id: string; //mongo ID
  exchangeName: string;
  symbol: string; //example 'BTC'
  quoteSymbol: string; //example 'USD'
  logoUrl: string;
  type: "withdrawal" | "deposit" | "sell" | "buy";
  date: number;
  amount: number;
  quoteAmount: number;
  price: number;
  value: number;
  fee: { cost: number; currency: string; rate: number };
}

export interface IOpenOrderItemView {
  id: string; //mongo ID
  exchangeName: string;
  symbol: string; //example 'BTC'
  quoteSymbol: string; //example 'USD'
  logoUrl: string;
  type: "withdrawal" | "deposit" | "sell" | "buy";
  date: number;
  amount: number;
  quoteAmount: number;
  price: number;
  value: number;
  fee: { cost: number; currency: string; rate: number };
}

export type timeframe = "24H" | "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";
export enum timespan {
  H24 = "24H",
  W1 = "1W",
  M1 = "1M",
  M3 = "3M",
  M6 = "6M",
  Y1 = "1Y",
  ALL = "ALL",
}

export interface IPortfolioLineChartItem {
  T: number; //UNIX timestamp of the plot point to be use as the x axis
  USD: number; //value in usd of the plot point on the y axis
  BTC?: number;
}
