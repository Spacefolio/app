import { IDigitalAsset } from "../../../core/entities/Integrations/Asset";
import { IDigitalAssetEntityGateway, IDigitalAssetMarketData  } from "../../../core/use-cases/integration/digitalAsset";
import DigitalAssetMapper from "./DigitalAssetMapper";

class DigitalAssetInMemoryEntityGateway implements IDigitalAssetEntityGateway {
  digitalAssets: IDigitalAsset[];

  constructor() {
    this.digitalAssets = [];
  }

  async exists (assetId: string): Promise<boolean> {
    const index = this.digitalAssets.findIndex(asset => asset.assetId === assetId);
    return index != -1;
  }

  async getDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    const result = this.digitalAssets.find(asset => asset.assetId === assetId);
    return result;
  }

  async updateDigitalAsset(asset: IDigitalAssetMarketData): Promise<IDigitalAsset | undefined> {
    const index = this.digitalAssets.findIndex((a: IDigitalAsset) => a.assetId === asset.id);
    if (index === -1) { return; }

    this.digitalAssets[index] = DigitalAssetMapper.fromMarketData(asset)
    return this.digitalAssets[index];
  }

  async createDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset> {
    const digitalAsset: IDigitalAsset = DigitalAssetMapper.fromMarketData(payload);
    this.digitalAssets.push(digitalAsset);

    return digitalAsset;
  }

  async deleteDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    const index = this.digitalAssets.findIndex((a: IDigitalAsset) => a.assetId === assetId);
    if (index === -1) return;
    
    const deletedAsset: IDigitalAsset = this.digitalAssets[index];
    this.digitalAssets.splice(index, 1);
    return deletedAsset;
  }

  async getDigitalAssets(): Promise<IDigitalAsset[]> {
    return this.digitalAssets;
  }

  async clearDigitalAssets(): Promise<void> {
    this.digitalAssets = [];
  }
}

export default DigitalAssetInMemoryEntityGateway;