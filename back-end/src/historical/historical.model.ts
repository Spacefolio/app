import mongoose, { Schema } from "mongoose";

export interface IHistoricalDataDocument extends mongoose.Document {
  symbol: string;
  dailyCandles: [IDailyCandle];
}

export interface IDailyCandleDocument extends mongoose.Document {
  day: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export interface IDailyCandle {
  day: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
  unadjustedVolume: number;
  change: number;
  changePercent: number;
  vwap: number;
  label: string;
  changeOverTime: number;
}

export interface IHistoricalData {
  symbol: string;
  dailyCandles: [IDailyCandle];
}

export interface IHistoricalDataModel
  extends mongoose.Model<IHistoricalDataDocument> {
  build(attr: IHistoricalData): IHistoricalDataDocument;
}

export interface IDailyCandleModel
  extends mongoose.Model<IDailyCandleDocument> {
  build(attr: IDailyCandle): IDailyCandleDocument;
}

export const dailyCandleSchema = new mongoose.Schema(
  {
    date: { type: String },
    day: { type: Number },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    adjClose: { type: Number },
    volume: { type: Number },
    unadjustedVolume: { type: Number },
    change: { type: Number },
    changePercent: { type: Number },
    vwap: { type: Number },
    label: { type: String },
    changeOverTime: { type: Number },
  },
);

const historicalDataSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  dailyCandles: [dailyCandleSchema],
});

historicalDataSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.hash;
  },
});

const HistoricalData = mongoose.model<
  IHistoricalDataDocument,
  IHistoricalDataModel
>("historical-value", historicalDataSchema);

export { HistoricalData };
