import { IDigitalAssetTransaction, IExchangeAccount, IOrder } from "../../../core/entities";
import { Balances } from "../../../core/entities/Integrations/Exchanges/Exchange";
import { IDigitalAssetEntityGateway } from "../../../core/use-cases/integration/digitalAsset";

export interface IExchangeAdapter {
  digitalAssetEntityGateway: IDigitalAssetEntityGateway;
  getRate(exchangeAccount: IExchangeAccount, baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined>;
  fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances>;
  fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]>;
  fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;
  fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;
  checkIsFiat(exchangeAccount: IExchangeAccount, symbol: string): Promise<boolean>;
}