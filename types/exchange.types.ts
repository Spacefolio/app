import { IPortfolioItem } from "../back-end/src/portfolios/portfolio.model";
import { ITransaction } from "../back-end/src/transactions/transaction.model";

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
