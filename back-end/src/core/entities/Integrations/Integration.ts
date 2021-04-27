import { IHolding, ITransaction } from ".";

export interface IIntegration {
  nickname: string,
}

export abstract class BaseIntegration implements IIntegration{
  public readonly nickname: string;

  protected constructor(integration : IIntegration) {
    this.nickname = integration.nickname;
  }

  public abstract GetCurrentHoldings(): Promise<IHolding[]>;
  public abstract GetTransactionHistory(): Promise<ITransaction[]>;
}