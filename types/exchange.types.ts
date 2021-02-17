import { IPortfolioItemInterface } from "../back-end/src/portfolios/models/portfolio.model";
import { ITransaction } from "../back-end/src/portfolios/models/transaction.model";

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
  portfolioItems?: [IPortfolioItemInterface];
  transactions?: [ITransaction]
}

export interface IExchangeAccountRequest {
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  name: string;
  nickname?: string;
  exchangeType: exchangeType;
}

export type exchangeType =
  | "coinbasepro"
  | "binance"
  | "kucoin"
  | "binanceus"
  | "hitbtc"
  | "coinbase";

export interface IExchangeReference {
  id: exchangeType;
  name: string;
  logoUrl: string;
}
