import mongoose from "mongoose";
import { holdingSnapshotSchema, IHoldingSnapshotDao, IValueDao, valueSchema } from "./Holding";

export type ITimeslicesDao = Map<string, ITimesliceDao>;

export interface IHoldingSliceDao {
  assetId: string;
  amount: number;
  price: IValueDao;
  value: IValueDao;
  snapshots: IHoldingSnapshotDao[];
}

export interface IHoldingSliceDocument extends IHoldingSliceDao, mongoose.Document {}

export const holdingSliceSchema = new mongoose.Schema<IHoldingSliceDocument>({
  assetId: String,
  amount: Number,
  price: valueSchema,
  value: valueSchema,
  snapshots: [holdingSnapshotSchema]
});

export interface ITimesliceDao {
  start: number;
  value: IValueDao;
  holdings: Map<string, IHoldingSliceDao>;
}

export interface ITimesliceDocument extends ITimesliceDao, mongoose.Document {}

export const timesliceSchema = new mongoose.Schema<ITimesliceDocument>({
  start: Number,
  value: { USD: Number },
  holdings: { type: mongoose.Schema.Types.Map, of: holdingSliceSchema }
});