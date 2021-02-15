import { IExchangeAccount } from "../types";

export type IPortfolioData = {
  data: [IExchangeAccount]
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
