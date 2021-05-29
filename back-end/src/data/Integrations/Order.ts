import { Action, OrderStatus } from "../../core/entities";
import mongoose from "mongoose";
import { feeSchema, IFeeDao } from "./Transaction";

export interface IOrderDao {
  timestamp: number;
  datetime: string;
  baseAsset: string;
  baseSymbol: string;
  quoteAsset: string;
  quoteSymbol: string;
  side: Action.BUY | Action.SELL;
  price: number;
  amount: number;
  filled: number;
  remaining: number;
  cost: number;
  status: OrderStatus;
  fee: IFeeDao
}

export const orderSchema = new mongoose.Schema({
  timestamp: { type: Number },
  datetime: String,
  baseAsset: String,
  baseSymbol: String,
  qouteAsset: String,
  quoteSymbol: String,
  side: { type: String, enum: Action },
  price: Number,
  amount: Number,
  filled: Number,
  cost: Number,
  status: { type: String, enum: OrderStatus },
  fee: feeSchema
});