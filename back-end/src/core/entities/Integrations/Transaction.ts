export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal"
}

export enum TransactionStatus {
  PENDING = 'pending',
  OK = 'ok'
}

export interface IFee {
  currency: string;
  rate: number;
  cost: number;
}

export interface ITransaction {
  timestamp: number;
  type: TransactionType;
}

export interface IDigitalAssetTransaction extends ITransaction {
  address: string;
  amount: number;
  currency: string;
  status: TransactionStatus
  fee: IFee;
}