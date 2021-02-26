import mongoose, { Schema } from "mongoose";
import { IPortfolioItem, portfolioItemSchema } from "../portfolios/portfolio.model";
import { IExchangeAccountView, exchangeType, ITransactionItemView } from "../../../types";
import { ITransaction, ITransactionDocument, transactionItemViewSchema, transactionSchema } from "../transactions/transaction.model";
import { IOrder, IOrderDocument, orderSchema } from "../transactions/order.model";

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
  portfolioItems: IPortfolioItem[];
  transactions: ITransactionDocument[];
  orders: IOrderDocument[];
  openOrders: IOrderDocument[];
  transactionViewItems: ITransactionItemView[];
}

export interface IExchangeAccountModel
  extends mongoose.Model<IExchangeAccountDocument> {
  build(attr: IExchangeAccountView): IExchangeAccountDocument;
}

const exchangeAccountSchema = new mongoose.Schema({
  apiInfo: {
    apiKey: { type: String, required: true },
    apiSecret: { type: String, required: true },
    passphrase: { type: String, required: false },
  },
  name: { type: String, required: true },
  nickname: { type: String },
  exchangeType: { type: String, required: true },
  addedDate: { type: Date, default: Date.now },
  portfolioItems: [portfolioItemSchema],
  transactions: [transactionSchema],
  orders: [orderSchema],
  openOrders: [orderSchema],
  transactionViewItems: [transactionItemViewSchema]
});

export interface IExchangeAccount {
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
  portfolioItems: [IPortfolioItem];
  transactions: [ITransaction];
  orders: [IOrder];
  openOrders: [IOrder];
  transactionViewItems: [ITransactionItemView];
}

exchangeAccountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: IExchangeAccountDocument, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

const ExchangeAccount = mongoose.model<
  IExchangeAccountDocument,
  IExchangeAccountModel
>("ExchangeAccount", exchangeAccountSchema);

export { ExchangeAccount };