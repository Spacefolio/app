import IDigitalAssetAdapter from "../../../data/Integrations/DigitalAsset/DigitalAssetAdapter";
import CoinGecko from "./CoinGecko";

class DigitalAssetsConfiguration {

  static getDigitalAssetAdapter(): IDigitalAssetAdapter {
    return new CoinGecko();
  }
}

export default DigitalAssetsConfiguration;