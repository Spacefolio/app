import { LeanDocument } from "mongoose";
import {  Exchange, ExchangesConfiguration } from "../../../config/core/Exchanges";
import { ExchangeAccount, makeExchangeAccount } from "../../../core/entities/Integration/Exchange";
import { IExchangeAccountDao, IExchangeAccountDocument } from "./ExchangeAccountModel";

class ExchangeAccountMapper {
  public static toDomain(raw: LeanDocument<IExchangeAccountDocument>): ExchangeAccount {

    const exchangeAccount = makeExchangeAccount({
      exchange: ExchangesConfiguration.get(raw.exchange),
      credentials: raw.credentials,
      nickname: raw.nickname
    });

    return exchangeAccount;
  }

  public static fromDomain(exchangeAccount: ExchangeAccount, userId: string): IExchangeAccountDao {
    const exchangeAccountDao: IExchangeAccountDao = {
      owner: userId,
      exchange: Exchange[exchangeAccount.exchange.id as keyof typeof Exchange],
      nickname: exchangeAccount.nickname,
      credentials: exchangeAccount.credentials
    }

    return exchangeAccountDao;
  }

  public static isExchangeAccountDao(toBeDetermined: string | IExchangeAccountDao): toBeDetermined is IExchangeAccountDao {
    if ((toBeDetermined as IExchangeAccountDao).credentials) {
      return true;
    }
    return false;
  }
}

export default ExchangeAccountMapper;
