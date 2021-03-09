import mongoose from "mongoose";
import { feeSchema, IFee } from "./transaction.model";


export interface IOrderDocument extends mongoose.Document {
  timestamp: number;
  datetime: string;
  symbol: string;
  side: "buy" | "sell";
  price: number;
  amount: number;
  filled: number;
  remaining: number;
  cost: number;
  status: "open" | "closed" | "canceled";
  fee: IFee
}

const orderSchema = new mongoose.Schema({
  timestamp: { type: Number },
  datetime: { type: String },
  symbol: { type: String },
  side: { type: String, enum: ["buy", "sell"] },
  price: { type: Number },
  amount: { type: Number },
  filled: { type: Number },
  remaining: { type: Number},
  cost: { type: Number },
  status: { type: String, enum: ["open", "closed", "canceled"] },
  fee: { type: feeSchema },
});

export interface IOrderModel
  extends mongoose.Model<IOrderDocument> {
  build(attr: IOrder): IOrderDocument;
}

export interface IOrder {
  timestamp: number;
  datetime: string;
  symbol: string;
  side: "buy" | "sell";
  price: number;
  amount: number;
  filled: number;
  remaining: number;
  cost: number;
  status: "open" | "closed" | "canceled";
  fee: IFee
}

/* #region   */
orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: IOrderDocument, ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});

/* #endregion */

const Order = mongoose.model<IOrderDocument, IOrderModel>(
  "Order",
  orderSchema
);

export { orderSchema, Order };
