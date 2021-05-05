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

export interface IHistoricalPrice {
  timestamp: number;
  price: number;
}

export interface IDigitalAssetHistory {
  assetId: string;
  prices: IHistoricalPrice[];
}