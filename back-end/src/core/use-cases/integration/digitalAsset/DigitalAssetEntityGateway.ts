import {  } from "../../../entities";
import { IDigitalAsset } from "../../../entities/Integrations/Asset";

export interface IDigitalAssetMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[]
  };
  roi?: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
}

interface IDigitalAssetEntityGateway {
  exists(assetId: string): Promise<boolean>;
  createDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset>;
  getDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined>;
  updateDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset | undefined>;
  deleteDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined>;
  getDigitalAssets(): Promise<IDigitalAsset[]>;
  clearDigitalAssets(): Promise<void>
}

export default IDigitalAssetEntityGateway;