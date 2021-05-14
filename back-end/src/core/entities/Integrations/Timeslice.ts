import { IValue } from "./Holding";
import { IHoldingSnapshot } from "./HoldingSnapshot";

export interface ITimeslices {
  [key: number]: ITimeslice;
}

export interface IHoldingSlice {
  assetId: string;
  amount: number;
  price: IValue;
  value: IValue;
  snapshots: IHoldingSnapshot[];
}

export interface ITimeslice {
  start: number;
  value: IValue;
  holdings: { [key: string]: IHoldingSlice };
}