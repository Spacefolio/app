import { LeanDocument } from "mongoose";
import { ExchangesConfiguration } from "../../../config/core/Exchanges";
import { ExchangeAccount, makeExchangeAccount, Exchange } from "../../../core/entities/Integrations/Exchanges";
import { IExchangeAccountDao, IExchangeAccountDocument } from "./ExchangeAccountModel";

class ExchangeAccountMapper {
  public static toDomain(raw: LeanDocument<IExchangeAccountDocument>): ExchangeAccount {

    const exchangeAccount = makeExchangeAccount({
      name: raw.name,
      accountId: raw.accountId,
      exchange: ExchangesConfiguration.get(raw.exchange),
      credentials: raw.credentials,
      nickname: raw.nickname,
      orders: raw.orders,
      openOrders: raw.openOrders,
      dailyTimeslices: raw.dailyTimeslices,
      hourlyTimeslices: raw.hourlyTimeslices,
      transactions: raw.transactions,
      holdings: raw.holdings,
      lastSynced: raw.lastSynced
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
      lastSynced: exchangeAccount.lastSynced
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
