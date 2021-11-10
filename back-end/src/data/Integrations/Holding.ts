import mongoose from "mongoose";
import { Action } from "../../core/entities";
import { IAssetDao } from "./DigitalAsset/DigitalAssetModel";

export interface IAmountsDao {
  deposited: number;
  withdrawn: number;
  bought: number;
  sold: number;
}

export interface IValueDao {
  USD: number;
}

export interface IValuesDao {
  deposited: IValueDao;
  withdrawn: IValueDao;
  bought: IValueDao;
  sold: IValueDao;
}

export interface IHoldingTotalDao {
  amount: IAmountsDao;
  value: IValuesDao;
  averageBuyPrice: IValueDao;
  averageSellPrice: IValueDao;
  fees: IValueDao;
}

export interface IHoldingBalanceDao {
  free: number;
  used: number;
  total: number;
}

export interface IAmountAndValueDao {
  amount: number;
  value: IValueDao;
}

export interface IHoldingSnapshotDao {
  timestamp: number;
  price: IValueDao;
  amountHeld: number;
  valueHeld: IValueDao;
  deposited?: IAmountAndValueDao;
  withdrew?: IAmountAndValueDao;
  bought?: IAmountAndValueDao;
  sold?: IAmountAndValueDao;
  total: IHoldingTotalDao;
  action: Action;
}

export interface IHoldingDao {
  asset: IAssetDao;
  balance: IHoldingBalanceDao;
  price: IValueDao;
  value: IValueDao;
  total: IHoldingTotalDao;
  snapshots: IHoldingSnapshotDao[];
}

export interface IHoldingDocument extends IHoldingDao, mongoose.Document {}

export const valueSchema = new mongoose.Schema({
  USD: { type: Number, required: true }
});

export const balanceSchema = new mongoose.Schema({
  free: { type: Number, required: true },
  used: { type: Number, required: true },
  total: { type: Number, required: true }
});

export const amountsSchema = new mongoose.Schema({
  deposited: { type: Number, required: true },
  withdrawn: { type: Number, required: true },
  bought: { type: Number, required: true },
  sold: { type: Number, required: true }
});

export const valuesSchema = new mongoose.Schema({
  deposited: valueSchema,
  withdrawn: valueSchema,
  bought: valueSchema,
  sold: valueSchema
});

export const holdingTotalSchema = new mongoose.Schema({
  amount: amountsSchema,
  value: valuesSchema,
  averageBuyPrice: valueSchema,
  averageSellPrice: valueSchema,
  fees: valueSchema
});

export const amountAndValueSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  value: valueSchema
});

export const holdingSnapshotSchema = new mongoose.Schema({
  timestamp: { type: Number, required: true },
  price: valueSchema,
  amountHeld: { type: Number, required: true },
  valueHeld: valueSchema,
  deposited: { type: amountAndValueSchema, required: false },
  withdrew: { type: amountAndValueSchema, required: false },
  bought: { type: amountAndValueSchema, required: false },
  sold: { type: amountAndValueSchema, required: false },
  total: holdingTotalSchema
});

export const assetSchema = new mongoose.Schema({
  assetId: String,
  symbol: String,
  name: String,
  image: String,
  sparkline: [Number]
});

export const holdingSchema = new mongoose.Schema<IHoldingDocument>({
  asset: assetSchema,
  balance: balanceSchema,
  price: valueSchema,
  value: valueSchema,
  total: holdingTotalSchema,
  snapshots: [holdingSnapshotSchema]
});