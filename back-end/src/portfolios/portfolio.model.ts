import mongoose from "mongoose";
import { IPortfolioItem } from "../../../types";

export interface IPortfolioItemDocument extends mongoose.Document {
    assetId: string;
    amount: number;
  }
  
  const portfolioItemSchema = new mongoose.Schema({
    assetId: { type: String, required: true },
    balance: {
      free: {type: Number, required: true},
      used: {type: Number, required: true},
      total: {type: Number, required: true}
    },
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