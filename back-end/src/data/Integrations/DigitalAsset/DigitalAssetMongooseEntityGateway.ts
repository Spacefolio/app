import { Model } from "mongoose";
import { IDigitalAsset } from "../../../core/entities";
import { IDigitalAssetEntityGateway, IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";
import DigitalAssetMapper from "./DigitalAssetMapper";
import { IDigitalAssetDocument } from "./DigitalAssetModel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class DigitalAssetMongooseEntityGateway implements IDigitalAssetEntityGateway {
  constructor(public DigitalAssets: Model<IDigitalAssetDocument>) {}
  
  async exists(assetId: string): Promise<boolean> {
    return await this.DigitalAssets.exists({ assetId });
  }
  
  async createDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset> {
    const digitalAsset = DigitalAssetMapper.fromMarketData(payload);
    return digitalAsset;
  }

  async getDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    const digitalAsset = await this.DigitalAssets.findOne({ assetId }).lean();
    if (!digitalAsset) return;
    return DigitalAssetMapper.toDomain(digitalAsset);
  }

  async updateDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset | undefined> {
    const digitalAsset = await this.DigitalAssets.findOne({ assetId: payload.id });
    if (!digitalAsset) return;

    const updateWith = DigitalAssetMapper.fromMarketData(payload);
    digitalAsset?.updateOne({ ...updateWith });
  }
  
  async deleteDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    const digitalAsset = await this.DigitalAssets.remove({ assetId });
    if (!digitalAsset) return;
    return DigitalAssetMapper.toDomain(digitalAsset);
  }
  
  async getDigitalAssets(): Promise<IDigitalAsset[]> {
    const digitalAssets = await this.DigitalAssets.find({}).lean();
    return digitalAssets.map((digitalAsset) => DigitalAssetMapper.toDomain(digitalAsset));
  }
  
  async clearDigitalAssets(): Promise<void> {
    await this.DigitalAssets.remove({});
  }
}