import { LeanDocument } from "mongoose";
import { IDigitalAssetTransaction, IHolding, IOrder, ITimeslices } from "../../../core/entities";
import { ExchangeAccount, makeExchangeAccount, Exchange, IExchangeCredentials, BaseExchange, IExchangeAccount, IExchange } from "../../../core/entities/Integrations/Exchanges";
import { IExchangeAccountDao, IExchangeAccountDocument } from "./ExchangeAccountModel";

class ExchangeAccountMapper {
  constructor (private exchanges: (exchange: Exchange) => BaseExchange) {}

  public toDomain(raw: LeanDocument<IExchangeAccountDocument>): ExchangeAccount {
    const credentials: IExchangeCredentials = {
      ...(raw.credentials.apiKey && { apiKey: raw.credentials.apiKey }),
      ...(raw.credentials.secret && { secret: raw.credentials.secret }),
      ...(raw.credentials.login && { login: raw.credentials.login }),
      ...(raw.credentials.password && { password: raw.credentials.password }),
      ...(raw.credentials.privateKey && { privateKey: raw.credentials.privateKey }),
      ...(raw.credentials.token && { token: raw.credentials.token }),
      ...(raw.credentials.twofa && { twofa: raw.credentials.twofa }),
      ...(raw.credentials.uid && { uid: raw.credentials.uid }),
      ...(raw.credentials.walletAddress && { walletAddress: raw.credentials.walletAddress })
     };

     const params: IExchangeAccount = {
      name: raw.name,
      accountId: raw.accountId,
      exchange: this.exchanges(raw.exchange as Exchange) as IExchange,
      credentials,
      nickname: raw.nickname,
      orders: raw.orders as IOrder[],
      openOrders: raw.openOrders as IOrder[],
      dailyTimeslices: raw.dailyTimeslices as ITimeslices,
      hourlyTimeslices: raw.hourlyTimeslices as ITimeslices,
      transactions: raw.transactions as IDigitalAssetTransaction[],
      holdings: raw.holdings as IHolding[],
      lastSynced: raw.lastSynced,
      createdAt: raw.createdAt
    };

    const exchangeAccount = makeExchangeAccount(params);

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
