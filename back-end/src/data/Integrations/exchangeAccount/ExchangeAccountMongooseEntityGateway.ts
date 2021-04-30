import { ExchangeAccountMapper, ExchangeAccountModel } from '../../';
import { ExchangesConfiguration } from '../../../config/core/Exchanges';
import { ExchangeAccount, IExchange, IExchangeAccount, makeExchangeAccount } from '../../../core/entities';
import { ICreateExchangeAccountPayload, IExchangeAccountEntityGateway, IUpdateExchangeAccountPayload } from '../../../core/use-cases/integration/exchangeAccount';

const ExchangeAccounts = ExchangeAccountModel;

class ExchangeAccountMongooseEntityGateway implements IExchangeAccountEntityGateway {
  
  async exists (accountId: string): Promise<boolean> {
    return await ExchangeAccounts.exists({ accountId });
  }

  async getExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
    const result = await ExchangeAccounts.findOne({ accountId }).lean();
    if (!result) return;
    return ExchangeAccountMapper.toDomain(result);
  }

  async updateExchangeAccount(account: IUpdateExchangeAccountPayload): Promise<ExchangeAccount | undefined> {
    const old = await ExchangeAccounts.findOne({ accountId: account.accountId });
    if (!old) { return; }

    old.nickname = account.nickname || old.nickname;
    old.credentials = account.credentials || old.credentials;

    const updatedAccount = await old.save();

    const updatedAccountAsEntity = ExchangeAccountMapper.toDomain(updatedAccount);
    return updatedAccountAsEntity;
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
    const exchangeAccountDao = ExchangeAccountMapper.fromDomain(exchangeAccount);
    
    ExchangeAccounts.create(exchangeAccountDao);

    return exchangeAccount;
  }

  async deleteExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined> {
   const deletedAccount = await ExchangeAccounts.findOneAndRemove({ accountId }).lean();
   if (!deletedAccount) return;
   const deletedAccountAsEntity = ExchangeAccountMapper.toDomain(deletedAccount);
   return deletedAccountAsEntity;
  }

  async getExchangeAccounts(): Promise<ExchangeAccount[]> {
    const exchangeAccounts = await ExchangeAccounts.find({}).lean();

    const exchangeAccountEntities = exchangeAccounts.map((account) => {
      return ExchangeAccountMapper.toDomain(account);
    });

    return exchangeAccountEntities;
  }

  async clearExchangeAccounts(): Promise<void> {
    throw 'Not Implemented';
  }
}

export default ExchangeAccountMongooseEntityGateway;