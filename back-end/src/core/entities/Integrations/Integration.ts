import { IHolding, ITransaction } from ".";

export interface IIntegration {
  name: string,
  nickname: string,
  holdings: IHolding[],
  transactions: ITransaction[]
}

export abstract class BaseIntegration implements IIntegration {
  public readonly name: string;
  public readonly nickname: string;
  public readonly holdings: IHolding[];
  public readonly transactions: ITransaction[];

  protected constructor(integration : IIntegration) {
    this.name = integration.name;
    this.nickname = integration.nickname;
    this.holdings = integration.holdings;
    this.transactions = integration.transactions;
  }
}