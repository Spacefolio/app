export enum TransactionType {
  DEPOSIT = 1,
  WITHDRAWAL = 2,
  BUY = 3,
  SELL = 4
}

export interface ITransaction {
  type: TransactionType;
  date: number;
  imageUrl: string;
}