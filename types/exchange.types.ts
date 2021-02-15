export interface IExchangeAccount {
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
  portfolioItems: [IPortfolioItem] | [string];
}

export interface IPortfolioItem {
  id: string;
  asset: IAsset;
  balance: { used: number; free: number; total: number };
  profitTotal: { All: number; "24H": number; lastTrade: number };
  currentPrice: number;
  profitPercentage: { All: number; "24H": number; lastTrade: number };
}

export interface IAsset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
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
