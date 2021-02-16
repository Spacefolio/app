import { IExchangeAccount } from "../types";

export interface IPortfolioData extends IExchangeAccount {
  profitPercentage: number;
  portfolioTotal: number;
  profitTotal: number;
}

export interface IPortfolioItem {
  id: string;
  asset: IAsset;
  balance: { used: number; free: number; total: number };
  profitTotal: { all: number; h24: number; lastTrade: number };
  currentPrice: number;
  profitPercentage: { all: number; h24: number; lastTrade: number };
}

export interface IAsset {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
}
