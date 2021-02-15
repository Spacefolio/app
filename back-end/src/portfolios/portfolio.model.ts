import { Balance } from "ccxt";
import mongoose from "mongoose";
import { IPortfolioItem } from "../../../types";

export interface IPortfolioItemDocument extends mongoose.Document {
    assetId: string;
    balance: Balance;
  }
  
  const portfolioItemSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    balance: { type: Object, required: true },
  });
  
  export interface IPortfolioItemModel
    extends mongoose.Model<IPortfolioItemDocument> {
    build(attr: IPortfolioItem): IPortfolioItemDocument;
  }

  const PortfolioItem = mongoose.model<
  IPortfolioItemDocument,
  IPortfolioItemModel
>("PortfolioItem", portfolioItemSchema);
  
export { PortfolioItem };