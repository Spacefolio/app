import { exchangeType } from "../types";

export interface IPortfolioData {
  name: string;
  id: string;
  nickname: string;
  addedDate: string
  exchangeType: exchangeType;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  portfolioItems: IPortfolioItem[];
  profitPercentage: number;
  portfolioTotal: number;
  profitTotal: number;
}

export interface IPortfolioItem {
  id: string;
  asset: IAsset;
  balance: number;
  profitTotal: { all: number; h24: number; lastTrade: number };
  currentPrice: number;
  profitPercentage: { all: number; h24: number; lastTrade: number };
}

export interface IAsset {
  assetId: string;
  name: string;
  symbol: string;
  logoUrl: string;
}
