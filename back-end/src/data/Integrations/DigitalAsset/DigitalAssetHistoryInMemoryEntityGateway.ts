import { IDigitalAssetHistory, IHistoricalPrice } from "../../../core/entities/Integrations/Asset";
import { IDigitalAssetHistoryEntityGateway } from "../../../core/use-cases/integration/digitalAsset";

class DigitalAssetHistoryInMemoryEntityGateway implements IDigitalAssetHistoryEntityGateway {
  digitalAssetHistories: IDigitalAssetHistory[];


  constructor() {
    this.digitalAssetHistories = [];
  }

  async getHourlyData(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined> {
    const result = this.digitalAssetHistories.find(asset => asset.assetId === assetId);
    if (!result) return;

    const startIndex = result.hourlyPrices.findIndex((historicalPrice) => historicalPrice.timestamp == from);
    const endIndex = result.hourlyPrices.findIndex((historicalPrice) => historicalPrice.timestamp == to);
    if (startIndex == -1 || endIndex == -1) return;

    return result.hourlyPrices.slice(startIndex, endIndex + 1);
  }

  async exists (assetId: string): Promise<boolean> {
    const index = this.digitalAssetHistories.findIndex(asset => asset.assetId === assetId);
    return index != -1;
  }

  async getDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined> {
    const result = this.digitalAssetHistories.find(asset => asset.assetId === assetId);
    return result;
  }

  async getHistoricalValue(assetId: string, timestamp: number): Promise<IHistoricalPrice | undefined> {
    const result = this.digitalAssetHistories.find(asset => asset.assetId === assetId);
    if (!result) return;

    const historicalPrice = result.prices.find((historicalPrice) => historicalPrice.timestamp == timestamp);
    return historicalPrice;
  }

  async getHistoricalValues(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined> {
    const result = this.digitalAssetHistories.find(asset => asset.assetId === assetId);
    if (!result) return;

    const startIndex = result.prices.findIndex((historicalPrice) => historicalPrice.timestamp == from);
    const endIndex = result.prices.findIndex((historicalPrice) => historicalPrice.timestamp == to);
    if (startIndex == -1 || endIndex == -1) return;

    return result.prices.slice(startIndex, endIndex + 1);
  }

  async updateDigitalAssetHistory(asset: IDigitalAssetHistory): Promise<IDigitalAssetHistory | undefined> {
    const index = this.digitalAssetHistories.findIndex((a: IDigitalAssetHistory) => a.assetId === asset.assetId);
    if (index === -1) { return; }

    this.digitalAssetHistories[index] = asset;
    return this.digitalAssetHistories[index];
  }

  async createDigitalAssetHistory(payload: IDigitalAssetHistory): Promise<IDigitalAssetHistory> {
    const digitalAssetHistory: IDigitalAssetHistory = payload
    this.digitalAssetHistories.push(digitalAssetHistory);

    return digitalAssetHistory;
  }

  async deleteDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined> {
    const index = this.digitalAssetHistories.findIndex((a: IDigitalAssetHistory) => a.assetId === assetId);
    if (index === -1) return;
    
    const deletedAssetHistory: IDigitalAssetHistory = this.digitalAssetHistories[index];
    this.digitalAssetHistories.splice(index, 1);
    return deletedAssetHistory;
  }

  async getAllDigitalAssetHistories(): Promise<IDigitalAssetHistory[]> {
    return this.digitalAssetHistories;
  }

  async clearDigitalAssetHistories(): Promise<void> {
    this.digitalAssetHistories = [];
  }
}

export default DigitalAssetHistoryInMemoryEntityGateway;