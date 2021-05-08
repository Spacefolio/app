import { IExchange } from ".";
import { BaseIntegration, IHolding, IIntegration, ITransaction } from "..";
import { IDigitalAssetTransaction } from "../Transaction";

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
  accountId: string;
  exchange: IExchange;
  credentials: IExchangeCredentials;
  transactions: IDigitalAssetTransaction[];
  holdings: IHolding[];
}

export class ExchangeAccount extends BaseIntegration implements IExchangeAccount {
  
  public readonly accountId: string;
  public readonly exchange: IExchange;
  public readonly credentials: IExchangeCredentials;
  public readonly transactions: IDigitalAssetTransaction[]

  protected constructor(exchangeAccount: IExchangeAccount) {
    super(exchangeAccount);
    this.accountId = exchangeAccount.accountId;
    this.exchange = exchangeAccount.exchange;
    this.credentials = exchangeAccount.credentials;
    this.transactions = exchangeAccount.transactions;
  }

  public async GetCurrentHoldings(): Promise<IHolding[]> {
    return this.holdings;
  }

  public async GetTransactionHistory(): Promise<ITransaction[]> {
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