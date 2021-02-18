import { Balance } from "ccxt";
import mongoose from "mongoose";
import { IAsset } from "../../../types";

/* #region Balance Schema */
const balanceSchema = new mongoose.Schema({
  free: { type: Number, required: true },
  used: { type: Number, required: true },
  total: { type: Number, required: true },
});
/* #endregion */

/* #region  Asset Schema */
const assetSchema = new mongoose.Schema({
  assetId: { type: String, required: true },
  name: { type: String, required: false },
  symbol: { type: String, required: true },
  logoUrl: { type: String, rquired: false },
});
/* #endregion */

export interface IPortfolioItemDocument extends mongoose.Document {
  assetId: string;
  balance: Balance;
}

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

/* #region JSON overrides */
portfolioItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.hash;
  },
});

assetSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.hash;
  },
});

balanceSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.hash;
  },
});
/* #endregion */

const PortfolioItem = mongoose.model<
  IPortfolioItemDocument,
  IPortfolioItemModel
>("PortfolioItem", portfolioItemSchema);

export { PortfolioItem, portfolioItemSchema };
