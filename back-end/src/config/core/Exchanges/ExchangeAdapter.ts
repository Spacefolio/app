import { IDigitalAssetTransaction, IExchangeAccount, IOrder } from "../../../core/entities";
import { Balances } from "../../../core/entities/Integrations/Exchanges/Exchange";

export interface IExchangeAdapter {
  getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined>;
  fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances>;
  fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]>;
  fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;
  fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]>;
}