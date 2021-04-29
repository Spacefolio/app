import { ExchangesConfiguration } from "../../../config/core/Exchanges";
import { ExchangeAccount, IExchange, IExchangeAccount, makeExchangeAccount } from "../../../core/entities";
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway, IUpdateExchangeAccountPayload } from "../../../core/use-cases/integration/exchangeAccount";

class ExchangeAccountInMemoryEntityGateway implements IExchangeAccountEntityGateway {
  exchangeAccounts: ExchangeAccount[];

  constructor() {
    this.exchangeAccounts = [];
  }

  async exists (accountId: string): Promise<boolean> {
    const index = this.exchangeAccounts.findIndex(account => account.accountId === accountId);
    return index != -1;
  }

  async getExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
    const result = this.exchangeAccounts.find(account => account.accountId === accountId);
    return result;
  }

  async updateExchangeAccount(account: IUpdateExchangeAccountPayload): Promise<ExchangeAccount | undefined> {
    const index = this.exchangeAccounts.findIndex((a: ExchangeAccount) => a.accountId === account.accountId);
    if (index === -1) { return; }

    const old = this.exchangeAccounts[index];
    const accountParams: IExchangeAccount = {
      accountId: old.accountId,
      exchange: old.exchange,
      nickname: account.nickname || old.nickname,
      credentials: account.credentials || old.credentials
    }
    this.exchangeAccounts[index] = makeExchangeAccount(accountParams);
    return this.exchangeAccounts[index];
  }

  async createExchangeAccount(payload: ICreateExchangeAccountPayload): Promise<ExchangeAccount> {

    const exchange: IExchange = ExchangesConfiguration.get(payload.exchange);
    const accountParams: IExchangeAccount = {
      accountId: payload.accountId,
      exchange: exchange,
      nickname: payload.nickname,
      credentials: payload.credentials
    }
    const exchangeAccount: ExchangeAccount = makeExchangeAccount(accountParams);
    this.exchangeAccounts.push(exchangeAccount);

    return exchangeAccount;
  }

  async deleteExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
    const index = this.exchangeAccounts.findIndex((a: ExchangeAccount) => a.accountId === accountId);
    if (index === -1) return;
    
    const deletedExchange: ExchangeAccount = this.exchangeAccounts[index];
    this.exchangeAccounts.splice(index, 1);
    return deletedExchange;
  }

  async getExchangeAccounts(): Promise<ExchangeAccount[]> {
    return this.exchangeAccounts;
  }

  async clearExchangeAccounts(): Promise<void> {
    this.exchangeAccounts = [];
  }
}

export default ExchangeAccountInMemoryEntityGateway;