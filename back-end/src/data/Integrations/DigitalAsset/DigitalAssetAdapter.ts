import { IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";
import { IHistoricalPrice } from "../../../core/entities/Integrations/Asset";

interface IDigitalAssetAdapter {
  fetchDigitalAssets: () => Promise<IDigitalAssetMarketData[]>
  fetchHourlyData: (assetId: string) => Promise<IHistoricalPrice[]>;
  fetchDailyData: (assetId: string) => Promise<IHistoricalPrice[]>;
}

export default IDigitalAssetAdapter;