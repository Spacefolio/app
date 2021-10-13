import { ExchangesConfiguration } from "../../../config/core/Exchanges";
import { ExchangeAccount, IExchange, IExchangeAccount, ITimeslice, makeExchangeAccount } from "../../../core/entities";
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
      name: old.name,
      accountId: old.accountId,
      exchange: old.exchange,
      nickname: account.nickname || old.nickname,
      credentials: account.credentials || old.credentials,
      holdings: account.holdings || old.holdings,
      transactions: account.transactions || old.transactions,
      orders: account.orders || old.orders,
      openOrders: account.openOrders || old.openOrders,
      dailyTimeslices: account.dailyTimeslices || old.dailyTimeslices,
      hourlyTimeslices: account.hourlyTimeslices || old.hourlyTimeslices,
      lastSynced: account.lastSynced || old.lastSynced
    };
    
    this.exchangeAccounts[index] = makeExchangeAccount(accountParams);
    return this.exchangeAccounts[index];
  }

  async createExchangeAccount(payload: ICreateExchangeAccountPayload): Promise<ExchangeAccount> {

    const exchange: IExchange = ExchangesConfiguration.get(payload.exchange);
    const accountParams: IExchangeAccount = {
      name: exchange.name,
      accountId: payload.accountId,
      exchange: exchange,
      nickname: payload.nickname,
      credentials: payload.credentials,
      holdings: payload.holdings || [],
      transactions: payload.transactions || [],
      orders: payload.orders || [],
      openOrders: payload.openOrders || [],
      dailyTimeslices: payload.dailyTimeslices || new Map<number, ITimeslice>(),
      hourlyTimeslices: payload.hourlyTimeslices || new Map<number, ITimeslice>(),
      lastSynced: new Date(0)
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