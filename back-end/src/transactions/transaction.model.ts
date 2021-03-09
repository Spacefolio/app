import mongoose from "mongoose";
import { ITransactionItemView } from "../../../types";

export interface IFee {
  currency: string;
  rate: number;
  cost: number;
}

const feeSchema = new mongoose.Schema({
  currency: { type: String },
  rate: { type: Number },
  cost: { type: Number },
});

export interface ITransactionDocument extends mongoose.Document {
  timestamp: number;
  datetime: string;
  address: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "ok";
  fee: IFee;
}

export interface ITransactionItemViewDocument extends mongoose.Document {
  exchangeName: string;
  symbol: string;
  quoteSymbol: string;
  logoUrl: string;
  type: "withdrawal" | "deposit" | "sell" | "buy";
  date: number;
  amount: number;
  quoteAmount: number;
  price: number;
  value: number;
  fee: IFee;
}

const transactionSchema = new mongoose.Schema({
  timestamp: { type: Number },
  datetime: { type: String },
  address: { type: String },
  type: { type: String, enum: ["deposit", "withdrawal"] },
  amount: { type: Number },
  currency: { type: String },
  status: { type: String, enum: ["pending", "ok"] },
  fee: { type: feeSchema },
});

export interface ITransactionModel
  extends mongoose.Model<ITransactionDocument> {
  build(attr: ITransaction): ITransactionDocument;
}

export interface ITransactionItemViewModel
  extends mongoose.Model<ITransactionItemViewDocument> {
  build(attr: ITransactionItemView): ITransactionItemViewDocument;
}

export interface ITransaction {
  timestamp: number;
  datetime: string;
  address: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "ok";
  fee: IFee;
}

const transactionItemViewSchema = new mongoose.Schema({
  exchangeName: String,
  symbol: String,
  quoteSymbol: String,
  logoUrl: String,
  type: { type: String, enum: ["withdrawal", "deposit", "sell", "buy"] },
  date: Number,
  amount: Number,
  quoteAmount: Number,
  price: Number,
  value: Number,
  fee: { type: feeSchema },
});

/* #region   */
transactionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: ITransactionDocument, ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});

feeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});
/* #endregion */

const Transaction = mongoose.model<ITransactionDocument, ITransactionModel>(
  "Transaction",
  transactionSchema
);

export { transactionSchema, transactionItemViewSchema, feeSchema, Transaction };
