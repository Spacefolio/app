import { Model } from "mongoose";
import { IDigitalAsset } from "../../../core/entities";
import { ONE_HOUR } from "../../../core/entities/Integrations/Timeslice";
import { IDigitalAssetEntityGateway, IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";
import IDigitalAssetAdapter from "./DigitalAssetAdapter";
import DigitalAssetMapper from "./DigitalAssetMapper";
import { IDigitalAssetDocument } from "./DigitalAssetModel";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class DigitalAssetMongooseEntityGateway implements IDigitalAssetEntityGateway {
  constructor(public DigitalAssets: Model<IDigitalAssetDocument>, public DigitalAssetAdapter: IDigitalAssetAdapter) {}
  
  async exists(assetId: string): Promise<boolean> {
    return await this.DigitalAssets.exists({ assetId });
  }
  
  async createDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset> {
    const digitalAsset = DigitalAssetMapper.fromMarketData(payload);
    await this.DigitalAssets.create({...digitalAsset, lastUpdatedTimestamp: Date.now()});
    return digitalAsset;
  }

  async getDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    let digitalAsset = await this.DigitalAssets.findOne({ assetId });
    if (!digitalAsset && !(await this.DigitalAssets.findOne({}))) {
      await this.fetchDigitalAssets();
      digitalAsset = await this.DigitalAssets.findOne({ assetId });
    }

    if (!digitalAsset) { return; }

    if (digitalAsset.lastUpdatedTimestamp < (Date.now() - ONE_HOUR)) {
      const updatedAsset = await this.fetchDigitalAsset(assetId);
      return updatedAsset;
    }

    return DigitalAssetMapper.toDomain(digitalAsset);
  }

  async getDigitalAssetBySymbol(symbol: string): Promise<IDigitalAsset | undefined> {
    symbol = symbol.toLowerCase();
    let digitalAsset = await this.DigitalAssets.findOne({ symbol }).lean();
    if (!digitalAsset && !(await this.DigitalAssets.findOne({}))) {
      await this.fetchDigitalAssets();
      digitalAsset = await this.DigitalAssets.findOne({ symbol }).lean();
    }

    if (!digitalAsset) { return; }
    return DigitalAssetMapper.toDomain(digitalAsset);
  }

  async updateDigitalAsset(payload: IDigitalAssetMarketData): Promise<IDigitalAsset | undefined> {
    const digitalAsset = await this.DigitalAssets.findOne({ assetId: payload.id });
    if (!digitalAsset) return;

    const updateWith = DigitalAssetMapper.fromMarketData(payload);
    digitalAsset?.updateOne({ ...updateWith, lastUpdatedTimestamp: Date.now() });
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

  private async fetchDigitalAssets(): Promise<void> {
    const digitalAssets = await this.DigitalAssetAdapter.fetchDigitalAssets();
    const now = Date.now();

    for (let i = 0; i < digitalAssets.length; i++) {
      const digitalAsset = DigitalAssetMapper.fromMarketData(digitalAssets[i]);
      await this.DigitalAssets.updateOne({ assetId: digitalAssets[i].id }, { ...digitalAsset, lastUpdatedTimestamp: now }, { upsert: true });
    }
  }

  private async fetchDigitalAsset(assetId: string): Promise<IDigitalAsset | undefined> {
    const digitalAssetMarketData = await this.DigitalAssetAdapter.fetchDigitalAsset(assetId).catch(() => undefined);
    if (!digitalAssetMarketData) {
      return digitalAssetMarketData;
    }
    const now = Date.now();

    const digitalAsset = DigitalAssetMapper.fromMarketData(digitalAssetMarketData);
    await this.DigitalAssets.updateOne({ assetId }, { ...digitalAsset, lastUpdatedTimestamp: now }, { upsert: true });
    return digitalAsset;
  }
}

export default DigitalAssetMongooseEntityGateway;