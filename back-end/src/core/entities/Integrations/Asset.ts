export interface IAsset {
  assetId: string;
  symbol: string;
  name: string;
  image: string;
}

export interface IDigitalAsset extends IAsset{
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
  }
}

export class NullAsset implements IDigitalAsset {
  currentPrice = 0;
  marketCap = 0;
  marketCapRank = 0;
  fullyDilutedValuation = 0;
  totalVolume = 0;
  high24Hour = 0;
  low24Hour = 0;
  priceChange24Hour = 0;
  priceChangePercentage = 0;
  marketCapChange24Hour = 0;
  marketCapChangePercentage = 0;
  circulatingSupply = 0;
  totalSupply = 0;
  maxSupply = 0;
  ath = 0;
  athChangePercentage = 0;
  athDate = '';
  atl = 0;
  atlChangePercentage = 0;
  atlDate = '';
  lastUpdated = '';
  assetId = '';
  symbol = '';
  name = '';
  image = '';

  constructor(assetId: string) {
    this.assetId = assetId;
    this.symbol = assetId;
    this.name = assetId;
  }
}

export interface IHistoricalPrice {
  timestamp: number;
  price: number;
}

export interface IDigitalAssetHistory {
  assetId: string;
  prices: IHistoricalPrice[];
  hourlyPrices: IHistoricalPrice[];
}