import { exchangeType } from "../types";

export interface IPortfolioData {
  name: string;
  id: string;
  nickname: string;
  addedDate: Date | string
  exchangeType: exchangeType;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  portfolioItems: IPortfolioItemView[];
  profitPercentage: number;
  portfolioTotal: number;
  profitTotal: number;
}

export interface IPortfolioItemView {
  id?: string;
  asset: IAsset;
  balance: number;
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
