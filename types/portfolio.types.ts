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
  portfolioItems: IPortfolioItemView[];
  profitPercentage: { USD: number };
  portfolioTotal: { USD: number };
  profitTotal: { USD: number };
}

export interface IPortfolioItemView {
  id?: string;
  asset: IAsset;
  balance: { USD: number };
  profitTotal: { all: number; h24: number; lastTrade: number };
  currentPrice: number;
  profitPercentage: { all: number; h24: number; lastTrade: number };
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
  type: "widthrawl" | "deposit" | "sell" | "buy";
  date: number;
  amount: number;
  quoteAmount: number;
  price: number;
  value: number;
  fee: { cost: number; currency: string; rate: number };
}
