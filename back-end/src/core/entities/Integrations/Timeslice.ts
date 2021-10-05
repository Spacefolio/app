import { IValue } from "./Holding";
import { IHoldingSnapshot } from "./HoldingSnapshot";

export const ONE_HOUR = 3600000;
export const ONE_DAY = 86400000;
export const ONE_WEEK = 604800000;

export type ITimeslices = Map<number, ITimeslice>
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
  holdings: Map<string, IHoldingSlice>;
}