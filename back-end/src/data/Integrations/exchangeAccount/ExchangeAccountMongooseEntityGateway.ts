import { Model } from 'mongoose';
import { ExchangeAccountMapper, IExchangeAccountDocument } from '../../';
import { BaseExchange, Exchange, ExchangeAccount, IExchange, IExchangeAccount, ITimeslice, makeExchangeAccount } from '../../../core/entities';
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway, IUpdateExchangeAccountPayload } from '../../../core/use-cases/integration/exchangeAccount';

class ExchangeAccountMongooseEntityGateway implements IExchangeAccountEntityGateway {
  private exchangeAccountMapper: ExchangeAccountMapper;

  constructor(public ExchangeAccounts:  Model<IExchangeAccountDocument>, public exchanges: (exchange: Exchange) => BaseExchange) {
    this.exchangeAccountMapper = new ExchangeAccountMapper(exchanges);
  }
  
  async exists (accountId: string): Promise<boolean> {
    return await this.ExchangeAccounts.exists({ accountId });
  }

  async getExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
    const result = await this.ExchangeAccounts.findOne({ accountId }).lean();
    if (!result) return;

    return this.exchangeAccountMapper.toDomain(result);
  }

  async updateExchangeAccount(account: IUpdateExchangeAccountPayload): Promise<ExchangeAccount | undefined> {

    const exchangeAccountDao = ExchangeAccountMapper.updatePayloadFromDomain(account);

    const updatedAccount = await this.ExchangeAccounts.findOneAndUpdate({ accountId: account.accountId }, { ...exchangeAccountDao }).lean();
    if (!updatedAccount) { return; }

    const updatedAccountAsEntity = this.exchangeAccountMapper.toDomain(updatedAccount);
    return updatedAccountAsEntity;
  }

  async createExchangeAccount(payload: ICreateExchangeAccountPayload): Promise<ExchangeAccount> {

    const exchange: IExchange = this.exchanges(payload.exchange);
    const accountParams: IExchangeAccount = {
      name: exchange.name,
      accountId: payload.accountId,
      exchange: exchange,
      nickname: payload.nickname,
      credentials: payload.credentials,
      holdings: payload.holdings || [],
      orders: [],
      openOrders: [],
      dailyTimeslices: new Map<number, ITimeslice>(),
      hourlyTimeslices: new Map<number, ITimeslice>(),
      transactions: payload.transactions || [],
      lastSynced: new Date(0),
      createdAt: new Date()
    }
    const exchangeAccount: ExchangeAccount = makeExchangeAccount(accountParams);
    const exchangeAccountDao = ExchangeAccountMapper.fromDomain(exchangeAccount);
    
    this.ExchangeAccounts.create(exchangeAccountDao);

    return exchangeAccount;
  }

  async deleteExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
   const deletedAccount = await this.ExchangeAccounts.findOneAndRemove({ accountId }).lean();
   if (!deletedAccount) return;
   const deletedAccountAsEntity = this.exchangeAccountMapper.toDomain(deletedAccount);
   return deletedAccountAsEntity;
  }

  async getExchangeAccounts(): Promise<ExchangeAccount[]> {
    const exchangeAccounts = await this.ExchangeAccounts.find({}).lean();

    const exchangeAccountEntities = exchangeAccounts.map((account) => {
      return this.exchangeAccountMapper.toDomain(account);
    });

    return exchangeAccountEntities;
  }

  async clearExchangeAccounts(): Promise<void> {
    throw 'Not Implemented';
  }
}

export default ExchangeAccountMongooseEntityGateway;