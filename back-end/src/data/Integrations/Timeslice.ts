import { IHoldingSnapshotDao, IValueDao } from "./Holding";

export interface ITimeslicesDao {
  [key: number]: ITimesliceDao;
}

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
  holdings: { [key: string]: IHoldingSliceDao };
}