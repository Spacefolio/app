import { IExchange } from ".";
import { BaseIntegration, IHolding, IIntegration, ITransaction } from "..";

export interface IExchangeCredentials {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  uid?: string;
  login?: string;
  twofa?: string;
  privateKey?: string;
  walletAddress?: string;
  token?: string;
}

export interface IExchangeAccount extends IIntegration {
  exchange: IExchange;
  credentials: IExchangeCredentials;
}

export class ExchangeAccount extends BaseIntegration implements IExchangeAccount {
  
  public readonly exchange: IExchange;
  public readonly credentials: IExchangeCredentials;

  protected constructor(exchangeAccount: IExchangeAccount) {
    super(exchangeAccount);
    this.exchange = exchangeAccount.exchange;
    this.credentials = exchangeAccount.credentials;
  }

  public GetCurrentHoldings(): Promise<IHolding[]> {
    throw new Error("Method not implemented.");
  }
  public GetTransactionHistory(): Promise<ITransaction[]> {
    throw new Error("Method not implemented.");
  }

  static buildMakeExchangeAccount() {
    return function makeExchangeAccount(exchangeAccountParams: IExchangeAccount): ExchangeAccount
    {
      return new ExchangeAccount(exchangeAccountParams);
    }
  }
}

export default ExchangeAccount.buildMakeExchangeAccount;