import { IDigitalAssetMarketData } from "../DigitalAssetEntityGateway";

export interface SaveDigitalAssetsRequest {
  digitalAssets: IDigitalAssetMarketData[];
}

export default SaveDigitalAssetsRequest;