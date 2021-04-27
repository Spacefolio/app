import { IAsset } from ".";

export interface IHolding {
  asset: IAsset;
  amount: number;
  price: number;
  value: number;
}