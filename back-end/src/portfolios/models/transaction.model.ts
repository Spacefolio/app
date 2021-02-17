import mongoose from "mongoose";

export interface IFee {
  type: "taker" | "maker";
  currency: string;
  rate: number;
  cost: number;
}

const feeSchema = new mongoose.Schema({
  type: { type: String, enum: ["taker", "maker"] },
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
  updated: number;
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
  updated: { type: Number },
  fee: { type: feeSchema },
});

export interface ITransactionModel
  extends mongoose.Model<ITransactionDocument> {
  build(attr: ITransaction): ITransactionDocument;
}

export interface ITransaction {
  timestamp: number;
  datetime: string;
  address: string;
  type: "deposit" | "withdrawal";
  amount: number;
  currency: string;
  status: "pending" | "ok";
  updated: number;
  fee: {
    type: "taker" | "maker";
    currency: string;
    rate: number;
    cost: number;
  };
}

/* #region   */
transactionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: ITransactionDocument, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

feeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.hash;
  },
});
/* #endregion */

const Transaction = mongoose.model<ITransactionDocument, ITransactionModel>(
  "Transaction",
  transactionSchema
);

export { transactionSchema, Transaction };
