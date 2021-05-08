import { Exchange, ExchangeAccount, IExchangeCredentials, IHolding } from "../../../entities";
import { IDigitalAssetTransaction } from "../../../entities/Integrations/Transaction";

export interface ICreateExchangeAccountPayload {
  accountId: string;
  exchange: Exchange;
  nickname: string;
  credentials: IExchangeCredentials;
  holdings?: IHolding[];
  transactions?: IDigitalAssetTransaction[];
}

export interface IUpdateExchangeAccountPayload {
  accountId: string;
  nickname?: string;
  credentials?: IExchangeCredentials;
}

interface IExchangeAccountEntityGateway {
  exists(accountId: string): Promise<boolean>;
  createExchangeAccount(payload: ICreateExchangeAccountPayload): Promise<ExchangeAccount>;
  getExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined>;
  updateExchangeAccount(payload: IUpdateExchangeAccountPayload): Promise<ExchangeAccount | undefined>;
  deleteExchangeAccount(accountId: string): Promise<ExchangeAccount | undefined>;
  getExchangeAccounts(): Promise<ExchangeAccount[]>;
  clearExchangeAccounts(): Promise<void>
}

export default IExchangeAccountEntityGateway;