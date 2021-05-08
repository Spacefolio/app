import mongoose from 'mongoose';

export interface IAssetDao {
  assetId: string;
  symbol: string;
  name: string;
  image: string;
}

export interface IDigitalAssetDao extends IAssetDao
{
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation: number;
  totalVolume: number;
  high24Hour: number;
  low24Hour: number;
  priceChange24Hour: number;
  priceChangePercentage: number;
  marketCapChange24Hour: number;
  marketCapChangePercentage: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  athChangePercentage: number;
  athDate: string;
  atl: number;
  atlChangePercentage: number;
  atlDate: string;
  lastUpdated: string;
  sparkline7day?: {
    price: number[];
  };
}

export interface IDigitalAssetDocument extends IDigitalAssetDao, mongoose.Document {}

const DigitalAssetSchema = new mongoose.Schema<IDigitalAssetDocument>({
  assetId: { type: String, unique: true, required: true },
	symbol: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  currentPrice: Number,
  marketCap: Number,
  marketCapRank: Number,
  fullyDilutedValuation: Number,
  totalVolume: Number,
  high24Hour: Number,
  low24Hour: Number,
  priceChange24Hour: Number,
  priceChangePercentage: Number,
  marketCapChange24Hour: Number,
  marketCapChangePercentage: Number,
  circulatingSupply: Number,
  totalSupply: Number,
  maxSupply: Number,
  ath: Number,
  athChangePercentage: Number,
  athDate: String,
  atl: Number,
  atlChangePercentage: Number,
  atlDate: String,
  lastUpdated: String,
  sparkline7day: { 
    type: {
      price: [Number]
    },
    required: false
  }
}, { timestamps: true });

const DigitalAssetModel = mongoose.model<IDigitalAssetDocument>('DigitalAsset', DigitalAssetSchema);
export default DigitalAssetModel;