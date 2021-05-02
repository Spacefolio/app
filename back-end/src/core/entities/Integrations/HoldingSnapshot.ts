import { IHoldingTotal, IValue } from "./Holding";

export interface IAmountAndValue {
  amount: number;
  value: IValue;
}

export interface IHoldingSnapshot {
  timestamp: number;
  price: IValue;
  amountHeld: number;
  valueHeld: IValue;
  deposited?: IAmountAndValue;
  withdrew?: IAmountAndValue;
  bought?: IAmountAndValue;
  sold?: IAmountAndValue;
  total: IHoldingTotal;
}