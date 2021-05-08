import { IHolding, ITransaction } from ".";

export interface IIntegration {
  nickname: string,
  holdings: IHolding[],
  transactions: ITransaction[]
}

export abstract class BaseIntegration implements IIntegration{
  public readonly nickname: string;
  public readonly holdings: IHolding[];
  public readonly transactions: ITransaction[];

  protected constructor(integration : IIntegration) {
    this.nickname = integration.nickname;
    this.holdings = integration.holdings;
    this.transactions = integration.transactions;
  }
}