import { Exchange } from "../../../../config/core/Exchanges";
import { ExchangeAccount, IExchangeCredentials } from "../../../entities";

export interface ICreateExchangeAccountPayload {
  accountId: string;
  exchange: Exchange;
  nickname: string;
  credentials: IExchangeCredentials;
}

export interface IUpdateExchangeAccountPayload {
  accountId: string;
  nickname?: string;
  credentials?: IExchangeCredentials;
}

interface IExchangeAccountEntityGateway {
  exists(accountId: string): Promise<boolean>;
  getExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined>;
  updateExchangeAccount(payload: IUpdateExchangeAccountPayload): Promise<ExchangeAccount | undefined>;
  createExchangeAccount(payload: ICreateExchangeAccountPayload): Promise<ExchangeAccount>;
  getExchangeAccounts(): Promise<ExchangeAccount[] | undefined>;
  clearExchangeAccounts(): Promise<void>;
}

export default IExchangeAccountEntityGateway;