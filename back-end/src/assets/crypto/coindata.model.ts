import mongoose, { Schema } from "mongoose";

export interface ICoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage: number;
  market_cap_change_24h: number;
  market_cap_change_percentage: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export const coinMarketDataSchema = new mongoose.Schema(
  {
    id: String,
    symbol: String,
    name: String,
    image: String,
    current_price: Number,
    market_cap: Number,
    market_cap_rank: Number,
    fully_diluted_valuation: Number,
    total_volume: Number,
    high_24h: Number,
    low_24h: Number,
    price_change_24h: Number,
    price_change_percentage: Number,
    market_cap_change_24h: Number,
    market_cap_change_percentage: Number,
    circulating_supply: Number,
    total_supply: Number,
    max_supply: Number,
    ath: Number,
    ath_change_percentage: Number,
    ath_date: String,
    atl: Number,
    atl_change_percentage: Number,
    atl_date: String,
    last_updated: String,
  },
  { id: false }
);

export interface ICoinListItem {
  id: String;
  symbol: String;
  name: String;
}

export interface ICoinListItemDocument extends mongoose.Document {
  id: String;
  symbol: String;
  name: String;
}

export interface ICoinDocument extends mongoose.Document {
  currentMarketData: ICoinMarketData;
  dailyPrices: string;
}

export const coinListItemSchema = new mongoose.Schema({
  id: String,
  symbol: String,
  name: String,
});

coinListItemSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: ICoinListItemDocument, ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});

export interface ICoinListItemModel
  extends mongoose.Model<ICoinListItemDocument> {
  build(attr: ICoinListItem): ICoinListItemDocument;
}

export interface ICoin {
  id: string;
  symbol: string;
  currentMarketData: ICoinMarketData;
  dailyPrices: string;
  currentPrice: { USD: number; lastUpdated: number };
}

export interface ICoinDocument extends mongoose.Document {
  id: string;
  symbol: string;
  currentMarketData: ICoinMarketData;
  dailyPrices: string;
  currentPrice: { USD: number; lastUpdated: number };
}

export const coinSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    symbol: { type: String },
    currentMarketData: coinMarketDataSchema,
    dailyPrices: { type: Schema.Types.ObjectId, ref: "historical-value" },
    currentPrice: { USD: Number, lastUpdated: Number },
  },
  { id: false }
);

coinSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: ICoinDocument, ret: any) {
    delete ret._id;
    delete ret.hash;
  },
});

export interface ICoinModel extends mongoose.Model<ICoinDocument> {
  build(attr: ICoin): ICoinDocument;
}

const Coin = mongoose.model<ICoinDocument, ICoinModel>("Coin", coinSchema);

export { Coin };
