import { IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";
import CoinGecko from "./CoinGecko";

class DigitalAssetsConfiguration {

  static getFetchDigitalAssets(): () => Promise<IDigitalAssetMarketData[]> {
    return this.fetchDigitalAssets;
  }

  private static async fetchDigitalAssets(): Promise<IDigitalAssetMarketData[]> {
    return await CoinGecko.fetchDigitalAssets();
  }
}

export default DigitalAssetsConfiguration;