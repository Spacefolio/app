import { Action } from ".";

export enum TransactionStatus {
  PENDING = 'pending',
  OK = 'ok'
}

export interface IFee {
  assetId: string;
  rate: number;
  cost: number;
}

export interface ITransaction {
  timestamp: number;
  type: Action.DEPOSIT | Action.WITHDRAW;
}

export interface IDigitalAssetTransaction extends ITransaction {
  address: string;
  amount: number;
  assetId: string;
  symbol: string;
  status: TransactionStatus
  fee: IFee;
}