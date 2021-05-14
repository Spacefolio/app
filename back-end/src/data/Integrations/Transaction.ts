import { TransactionStatus } from "../../core/entities/Integrations/Transaction";
import mongoose from "mongoose";
import { Action } from "../../core/entities";

export interface ITransactionDao {
  timestamp: number;
  type: Action.WITHDRAW | Action.DEPOSIT;
}

export interface IFeeDao {
  assetId: string;
  rate: number;
  cost: number;
}

export const feeSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  rate: { type: Number, required: true },
  cost: { type: Number, required: true }
});

export interface IDigitalAssetTransactionDao extends ITransactionDao {
  address: string;
  amount: number;
  assetId: string;
  status: TransactionStatus;
  fee: IFeeDao
}

export interface IDigitalAssetTransactionDocument extends IDigitalAssetTransactionDao, mongoose.Document {}

export const digitalAssetTransactionSchema = new mongoose.Schema({
  timestamp: Number,
  type: { type: String, enum: Action, required: true },
  address: String,
  amount: Number,
  currency: String,
  status: { type: String, enum: TransactionStatus, required: true },
  fee: feeSchema
});