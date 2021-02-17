import mongoose, { Schema } from "mongoose";
import { IPortfolioItemInterface, portfolioItemSchema } from "../portfolios/models/portfolio.model";
import { IExchangeAccount, exchangeType } from "../../../types";
import { JsonOptions } from "../_helpers/db";
import { ITransaction, transactionSchema } from "../portfolios/models/transaction.model";

export interface IExchangeAccountDocument extends mongoose.Document {
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
  portfolioItems: IPortfolioItemInterface[];
  transactions: ITransaction[];
}

export interface IExchangeAccountModel
  extends mongoose.Model<IExchangeAccountDocument> {
  build(attr: IExchangeAccount): IExchangeAccountDocument;
}

const exchangeAccountSchema = new mongoose.Schema({
  apiInfo: {
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    passphrase: { type: String, required: false }
  },
  name: { type: String, required: true },
  nickname: { type: String },
  exchangeType: { type: String, required: true },
  addedDate: { type: Date, default: Date.now },
  portfolioItems: [portfolioItemSchema],
  transactions: [transactionSchema]
});

exchangeAccountSchema.set("toJSON", JsonOptions);

const ExchangeAccount = mongoose.model<
  IExchangeAccountDocument,
  IExchangeAccountModel
>("ExchangeAccount", exchangeAccountSchema);

export { ExchangeAccount };
