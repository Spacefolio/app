import { LeanDocument } from "mongoose";
import { ExchangesConfiguration } from "../../../config/core/Exchanges";
import { ExchangeAccount, makeExchangeAccount, Exchange, IExchangeCredentials } from "../../../core/entities/Integrations/Exchanges";
import { IExchangeAccountDao, IExchangeAccountDocument } from "./ExchangeAccountModel";

class ExchangeAccountMapper {
  public static toDomain(raw: LeanDocument<IExchangeAccountDocument>): ExchangeAccount {
    const credentials: IExchangeCredentials = {
      ...(raw.credentials.apiKey && { apiKey: raw.credentials.apiKey }),
      ...(raw.credentials.apiSecret && { apiSecret: raw.credentials.apiSecret }),
      ...(raw.credentials.login && { login: raw.credentials.login }),
      ...(raw.credentials.passphrase && { passphrase: raw.credentials.passphrase }),
      ...(raw.credentials.privateKey && { privateKey: raw.credentials.privateKey }),
      ...(raw.credentials.token && { token: raw.credentials.token }),
      ...(raw.credentials.twofa && { twofa: raw.credentials.twofa }),
      ...(raw.credentials.uid && { uid: raw.credentials.uid }),
      ...(raw.credentials.walletAddress && { walletAddress: raw.credentials.walletAddress })
     };

    const exchangeAccount = makeExchangeAccount({
      name: raw.name,
      accountId: raw.accountId,
      exchange: ExchangesConfiguration.get(raw.exchange),
      credentials,
      nickname: raw.nickname,
      orders: raw.orders,
      openOrders: raw.openOrders,
      dailyTimeslices: raw.dailyTimeslices,
      hourlyTimeslices: raw.hourlyTimeslices,
      transactions: raw.transactions,
      holdings: raw.holdings,
      lastSynced: raw.lastSynced,
      createdAt: raw.createdAt
    });

    return exchangeAccount;
  }

  public static fromDomain(exchangeAccount: ExchangeAccount): IExchangeAccountDao {
    const exchangeAccountDao: IExchangeAccountDao = {
      name: exchangeAccount.name,
      accountId: exchangeAccount.accountId,
      exchange: <Exchange>(exchangeAccount.exchange.id),
      nickname: exchangeAccount.nickname,
      credentials: exchangeAccount.credentials,
      holdings: exchangeAccount.holdings,
      orders: exchangeAccount.orders, 
      openOrders: exchangeAccount.openOrders,
      dailyTimeslices: exchangeAccount.dailyTimeslices,
      hourlyTimeslices: exchangeAccount.hourlyTimeslices,
      transactions: exchangeAccount.transactions,
      lastSynced: exchangeAccount.lastSynced,
      createdAt: exchangeAccount.createdAt
    }

    return exchangeAccountDao;
  }

  public static isExchangeAccountDao(toBeDetermined: string | IExchangeAccountDao): toBeDetermined is IExchangeAccountDao {
    if (!toBeDetermined) return false;
    if ((toBeDetermined as IExchangeAccountDao).credentials) {
      return true;
    }
    return false;
  }
}

export default ExchangeAccountMapper;
