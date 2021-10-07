import { IHoldingSnapshotDao, IValueDao } from "./Holding";

export type ITimeslicesDao = Map<number, ITimesliceDao>;

export interface IHoldingSliceDao {
  assetId: string;
  amount: number;
  price: IValueDao;
  value: IValueDao;
  snapshots: IHoldingSnapshotDao[];
}

export interface ITimesliceDao {
  start: number;
  value: IValueDao;
  holdings: Map<string, IHoldingSliceDao>;
}