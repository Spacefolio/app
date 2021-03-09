import mongoose, { Schema } from "mongoose";
import {
  holdingSnapshotSchema,
  IPortfolioItem,
  portfolioItemSchema,
} from "../portfolios/portfolio.model";
import {
  IExchangeAccountView,
  exchangeType,
  ITransactionItemView,
} from "../../../types";
import {
  ITransaction,
  ITransactionDocument,
  transactionItemViewSchema,
  transactionSchema,
} from "../transactions/transaction.model";
import {
  IOrder,
  IOrderDocument,
  orderSchema,
} from "../transactions/order.model";

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
  timeslices: ITimeslices;
  lastSyncedDate: Date;
}

export interface IHoldingSnapshot {
  timestamp: number;
  price: { USD: number };
  amountBought: number;
  amountSold: number;
  totalAmountBought: number;
  totalAmountSold: number;
  totalValueReceived: number;
  totalValueInvested: number;
}

export interface IHoldingsHistory {
  [key: string]: IHoldingSnapshot[];
}

const holdingSliceSchema = new mongoose.Schema({
  asset: String,
  amount: Number,
  price: Number,
  value: Number,
  snapshots: [holdingSnapshotSchema],
});

export interface IHoldingSlice {
  asset: string;
  amount: number;
  price: number;
  value: number;
  snapshots: IHoldingSnapshot[];
}

export interface ITimeslices {
  [key: number]: ITimeslice;
}

export interface ITimeslice {
  start: number;
  value: number;
  holdings: { [key: string]: IHoldingSlice };
}

const timesliceSchema = new mongoose.Schema({
  start: Number,
  value: Number,
  holdings: [holdingSliceSchema],
});

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
  transactionViewItems: [transactionItemViewSchema],
  timeslices: { type: Object },
  lastSyncedDate: { type: Date, default: 0 },
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
  timeslices: [ITimeslice];
  lastSyncedDate: Date;
}

exchangeAccountSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: IExchangeAccountDocument, ret: any) {
    delete ret._id;
    delete ret.hash;
    delete ret.orders;
    delete ret.transactions;
    delete ret.openOrders;
    delete ret.timeslices;
    delete ret.lastSyncedDate;
  },
});

const ExchangeAccount = mongoose.model<
  IExchangeAccountDocument,
  IExchangeAccountModel
>("ExchangeAccount", exchangeAccountSchema);

export { ExchangeAccount };
