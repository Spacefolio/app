import mongoose from 'mongoose';
import { IHistoricalPrice } from '../../../core/entities/Integrations/Asset';

export interface IDigitalAssetHistoryDao {
  assetId: string;
  prices: Array<IHistoricalPrice>;
  hourlyPrices: Array<IHistoricalPrice>;
}

export const historicalPriceSchema = new mongoose.Schema({
  timestamp: Number,
  price: Number
});

export interface IDigitalAssetHistoryDocument extends IDigitalAssetHistoryDao, mongoose.Document {}

const DigitalAssetHistorySchema = new mongoose.Schema<IDigitalAssetHistoryDocument>({
  assetId: { type: String, unique: true, required: true },
  prices: [historicalPriceSchema],
  hourlyPrices: [historicalPriceSchema]
});

const DigitalAssetHistoryModel = mongoose.model<IDigitalAssetHistoryDocument>('DigitalAssetHistory', DigitalAssetHistorySchema);
export default DigitalAssetHistoryModel;