import { IDigitalAssetHistory, IHistoricalPrice } from "../../../entities/Integrations/Asset";

interface IDigitalAssetHistoryEntityGateway {
  exists(assetId: string): Promise<boolean>;
  createDigitalAssetHistory(payload: IDigitalAssetHistory): Promise<IDigitalAssetHistory>;
  getDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined>;
  getHistoricalValue(assetId: string, timestamp: number): Promise<IHistoricalPrice | undefined>;
  getHistoricalValues(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined>;
  getHourlyData(assetId: string, from: number, to: number): Promise<IHistoricalPrice[] | undefined>;
  updateDigitalAssetHistory(payload: IDigitalAssetHistory): Promise<IDigitalAssetHistory>;
  deleteDigitalAssetHistory(assetId: string): Promise<IDigitalAssetHistory | undefined>;
  getAllDigitalAssetHistories(): Promise<IDigitalAssetHistory[]>;
  clearDigitalAssetHistories(): Promise<void>
}

export default IDigitalAssetHistoryEntityGateway;