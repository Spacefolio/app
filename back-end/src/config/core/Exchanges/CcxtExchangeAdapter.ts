import { Action, IDigitalAssetTransaction, IExchangeAccount, IOrder } from "../../../core/entities";
import { Balances, Exchange } from "../../../core/entities/Integrations/Exchanges/Exchange";
import CcxtService from "./CcxtService";
import { IExchangeAdapter } from "./ExchangeAdapter";
import ccxt from 'ccxt';
import { TransactionStatus } from "../../../core/entities/Integrations/Transaction";

class CcxtExchangeAdapter implements IExchangeAdapter {
  sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

  async checkIsFiat(exchangeAccount: IExchangeAccount, symbol: string): Promise<boolean> {
    //const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    if (symbol === 'USD') {
      return true;
    }

    return false;
  }
  async getRate(exchangeAccount: IExchangeAccount, baseSymbol: string, quoteSymbol: string, timestamp?: number): Promise<number | undefined> {
    if (baseSymbol === 'USD') { return 1; }

    const marketPair = baseSymbol + '/' + quoteSymbol;

    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);

    if (!timestamp) {
      if (!exchange.has.fetchTicker) {
        return;
      }

      await this.sleep(exchange.rateLimit);

      const ticker = await exchange.fetchTicker(marketPair).catch((err) => {
        console.log(err);
        return undefined;
      });

      if (!ticker) {
        return;
      }

      const rate = ticker.last ? ticker.last : ((ticker.high + ticker.low) / 2);
      return rate;
    }

    if (!exchange.has.fetchOHLCV) {
      return;
    }

    await this.sleep(exchange.rateLimit);

    const OHLCV = await exchange.fetchOHLCV(marketPair, '1m', timestamp, 1);
    if (OHLCV.length < 1) {
      return;
    }

    const rate = (OHLCV[0][1] + OHLCV[0][4]) / 2;
    return rate;
  }
  async fetchBalances(exchangeAccount: IExchangeAccount): Promise<Balances> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);

    console.log("In fetchBalances");

    if (!exchange.hasFetchBalance) {
      return {};
    }
    console.log("Sleeping");
    await this.sleep(exchange.rateLimit);
    const balances = await exchange.fetchBalance().catch(err => { console.log(err); return {}; });
    return balances;
  }
  async fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    let params = {};
    if (exchangeAccount.exchange.id === Exchange.COINBASE) {
      await this.sleep(exchange.rateLimit);
      const accounts = await exchange.fetchAccounts();
      console.log(accounts);
      params = {
        accountId: 0
      };
    }
    console.log("In transactions");
    let ccxtTransactions: ccxt.Transaction[] = [];
    
    if (!exchange.hasFetchTransactions || exchangeAccount.exchange.id === Exchange.COINBASE) {
      if (!exchange.hasFetchDeposits && !exchange.hasFetchWithdrawals) return [];

      if (exchange.hasFetchDeposits) {
        await this.sleep(exchange.rateLimit);
        const deposits = await exchange.fetchDeposits(undefined, exchangeAccount.lastSynced.valueOf(), undefined, params).catch(err => {
          console.log(err);
          return [];
        });

        ccxtTransactions = ccxtTransactions.concat(deposits);
      }

      if (exchange.hasFetchWithdrawals) {
        await this.sleep(exchange.rateLimit);

        const withdrawals = await exchange.fetchWithdrawals(undefined, exchangeAccount.lastSynced.valueOf(), undefined, params).catch(err => {
          console.log(err);
          return [];
        });

        ccxtTransactions = ccxtTransactions.concat(withdrawals);
      }
    } else {
      await this.sleep(exchange.rateLimit);

      ccxtTransactions = await exchange.fetchTransactions(undefined, exchangeAccount.lastSynced.valueOf(), undefined, params).catch(err => {
        console.log(err);
        return [];
      });
    }

    const transactions: IDigitalAssetTransaction[] = ccxtTransactions.map((transaction) => this.transactionFromCcxtTransaction(transaction));
    return transactions;
  }
  async fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    return [];
  }
  async fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    return [];
  }

  private transactionFromCcxtTransaction(transaction: ccxt.Transaction): IDigitalAssetTransaction {
    const digitalAssetTransaction: IDigitalAssetTransaction = {
      address: transaction.address,
      amount: transaction.amount,
      assetId: transaction.currency,
      symbol: transaction.currency,
      status: transaction.status as TransactionStatus,
      fee: {
        assetId: transaction.fee.currency,
        rate: transaction.fee.rate,
        cost: transaction.fee.cost
      },
      timestamp: transaction.timestamp,
      type: transaction.type === 'deposit' ? Action.DEPOSIT : Action.WITHDRAW
    }

    return digitalAssetTransaction;
  }
}

export default CcxtExchangeAdapter;