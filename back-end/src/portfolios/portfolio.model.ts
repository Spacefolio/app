import { Balance } from "ccxt";
import mongoose from "mongoose";
import { IAsset } from "../../../types";

export interface IPortfolioItemDocument extends mongoose.Document {
    assetId: string;
    balance: Balance;
  }

const balanceSchema = new mongoose.Schema({
  free: { type: Number, required: true },
  used: {type: Number, required: true },
  total: {type: Number, required: true }
});

const assetSchema = new mongoose.Schema({
  assetId: { type: String, required: true },
  name: { type: String, required: false },
  symbol: { type: String, required: true },
  logoUrl: { type: String, rquired: false }
})
  
const portfolioItemSchema = new mongoose.Schema({
    asset: assetSchema,
    balance: balanceSchema,
  });
  
  export interface IPortfolioItemModel
    extends mongoose.Model<IPortfolioItemDocument> {
    build(attr: IPortfolioItem): IPortfolioItemDocument;
  }

  export interface IPortfolioItem {
    asset: IAsset;
    balance: { used: number; free: number; total: number };
  }

  const PortfolioItem = mongoose.model<
  IPortfolioItemDocument,
  IPortfolioItemModel
>("PortfolioItem", portfolioItemSchema);
  
export { PortfolioItem, portfolioItemSchema };