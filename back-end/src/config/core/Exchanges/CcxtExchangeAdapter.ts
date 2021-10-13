import { IDigitalAssetTransaction, IExchangeAccount, IOrder } from "../../../core/entities";
import { Balances } from "../../../core/entities/Integrations/Exchanges/Exchange";
import { IExchangeAdapter } from "./ExchangeAdapter";

class CcxtExchangeAdapter implements IExchangeAdapter {
  getRate(baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined> {
    throw new Error("Method not implemented.");
  }
  fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances> {
    throw new Error("Method not implemented.");
  }
  fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]> {
    throw new Error("Method not implemented.");
  }
  fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
  fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    throw new Error("Method not implemented.");
  }
}

export default CcxtExchangeAdapter;