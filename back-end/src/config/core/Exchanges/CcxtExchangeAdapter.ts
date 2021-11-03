import { Action, IDigitalAssetTransaction, IExchangeAccount, IOrder, OrderStatus } from "../../../core/entities";
import { Balances, Exchange } from "../../../core/entities/Integrations/Exchanges/Exchange";
import CcxtService from "./CcxtService";
import { IExchangeAdapter } from "./ExchangeAdapter";
import ccxt from 'ccxt';
import { IFee, TransactionStatus } from "../../../core/entities/Integrations/Transaction";
import { IDigitalAssetEntityGateway } from "../../../core/use-cases/integration/digitalAsset";

class CcxtExchangeAdapter implements IExchangeAdapter {
  digitalAssetEntityGateway: IDigitalAssetEntityGateway;

  constructor (digitalAssetEntityGateway: IDigitalAssetEntityGateway) {
    this.digitalAssetEntityGateway = digitalAssetEntityGateway;
  }

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

    const marketPair = baseSymbol.toUpperCase() + '/' + quoteSymbol.toUpperCase();

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

    const OHLCV = await exchange.fetchOHLCV(marketPair, '1m', timestamp, 1).catch(err => {
      console.log(err);
      return undefined;
    });

    if (!OHLCV || OHLCV.length < 1) {
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
    const balances = await exchange.fetchBalance().catch(err => { console.log(err); return; });
    if (!balances) {
      return {};
    }

    delete balances.total;
    delete balances.used;
    delete balances.info;
    delete balances.free;

    return balances;
  }

  async fetchTransactions(exchangeAccount: IExchangeAccount): Promise<IDigitalAssetTransaction[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    let ccxtTransactions: ccxt.Transaction[] = [];
    let digitalAssetTransactions: IDigitalAssetTransaction[] = [];

    if (exchangeAccount.exchange.id === Exchange.COINBASE) {
      let ledgerEntries: CcxtLedgerEntry[] = [];
      await this.sleep(exchange.rateLimit);
      const accounts = await exchange.fetchAccounts().catch((err: any) => { console.log(err) });
      if (!accounts) { return []; }
      console.log(accounts);
      for (const account of accounts) {
        await this.sleep(exchange.rateLimit);
        const transactions = await exchange.fetchLedger(undefined, exchangeAccount.lastSynced.valueOf(), undefined, { accountId: account.id }).catch(err => console.log(err));
        if (transactions) ledgerEntries = ledgerEntries.concat(transactions);
      }

      // const fiatDeposits = await exchange.fetchDeposits('USD', exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err): ccxt.Transaction[] => {
      //   console.log(err);
      //   return [];
      // });

      // if (fiatDeposits.length > 0) {
      //   ccxtTransactions = ccxtTransactions.concat(fiatDeposits);
      // }

      // const fiatWithdrawals = await exchange.fetchWithdrawals('USD', exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err): ccxt.Transaction[] => {
      //   console.log(err);
      //   return [];
      // });

      // if (fiatWithdrawals.length > 0) {
      //   ccxtTransactions = ccxtTransactions.concat(fiatWithdrawals);
      // }

      digitalAssetTransactions = await Promise.all(ledgerEntries.map((transaction) => this.transactionFromCcxtLedgerEntry(transaction)));
      //digitalAssetTransactions = digitalAssetTransactions.concat(ccxtTransactions.map((transaction) => this.transactionFromCcxtTransaction(transaction)));
      console.log(digitalAssetTransactions);
      return digitalAssetTransactions;
    }
    
    if (!exchange.hasFetchTransactions) {
      if (!exchange.hasFetchDeposits && !exchange.hasFetchWithdrawals) return [];

      if (exchange.hasFetchDeposits) {
        await this.sleep(exchange.rateLimit);
        const deposits = await exchange.fetchDeposits(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch(err => {
          console.log(err);
          return;
        });

        if (deposits) {
          ccxtTransactions = ccxtTransactions.concat(deposits);
        }
      }

      if (exchange.hasFetchWithdrawals) {
        await this.sleep(exchange.rateLimit);

        const withdrawals = await exchange.fetchWithdrawals(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch(err => {
          console.log(err);
          return;
        });

        if (withdrawals) {
          ccxtTransactions = ccxtTransactions.concat(withdrawals);
        }
      }
    } else {
      await this.sleep(exchange.rateLimit);

      ccxtTransactions = await exchange.fetchTransactions(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch(err => {
        console.log(err);
        return [];
      });
    }

    const transactions: IDigitalAssetTransaction[] = await Promise.all(ccxtTransactions.map((transaction) => this.transactionFromCcxtTransaction(transaction)));
    return transactions;
  }

  async fetchOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);
    let ccxtOrders: ccxt.Order[] = [];

    if (exchangeAccount.exchange.id === Exchange.COINBASE) {
      await this.sleep(exchange.rateLimit);
      const accounts = await exchange.fetchAccounts().catch((err: any) => { console.log(err) });
      if (!accounts) { return []; }
      for (const account of accounts) {
        await this.sleep(exchange.rateLimit);
        const buyOrders = await exchange.fetchBuys(account.code, exchangeAccount.lastSynced.valueOf(), undefined, { accountId: account.id }).catch((err: any) => console.log(err));
        await this.sleep(exchange.rateLimit);
        const sellOrders = await exchange.fetchSells(account.code, exchangeAccount.lastSynced.valueOf(), undefined, { accountId: account.id }).catch((err: any) => console.log(err));
        if (buyOrders) ccxtOrders = ccxtOrders.concat(buyOrders);
        if (sellOrders) ccxtOrders = ccxtOrders.concat(sellOrders);
      }

      return await Promise.all(ccxtOrders.map((order) => this.orderFromCcxtOrder(order, OrderStatus.CLOSED)));
    }

    if (exchange.hasFetchClosedOrders) {
      const orders = await exchange.fetchClosedOrders(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err: any) => console.log(err));
      if (!orders) return [];
      return await Promise.all(orders.map((order) => this.orderFromCcxtOrder(order, OrderStatus.CLOSED)));
    }

    if (exchange.hasFetchOrders) {
      let orders = await exchange.fetchOrders(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err: any) => console.log(err));
      if (!orders) return [];
      orders = orders.filter((order) => order.status === 'closed');
      return await Promise.all(orders.map((order) => this.orderFromCcxtOrder(order, OrderStatus.CLOSED)));
    }

    return [];
  }

  async fetchOpenOrders(exchangeAccount: IExchangeAccount): Promise<IOrder[]> {
    const exchange = CcxtService.createExchangeAccess(exchangeAccount.exchange.id as Exchange, exchangeAccount.credentials);

    if (exchange.hasFetchOpenOrders) {
      const orders = await exchange.fetchOpenOrders(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err: any) => console.log(err));
      if (!orders) return [];
      return await Promise.all(orders.map((order) => this.orderFromCcxtOrder(order, OrderStatus.OPEN)));
    }

    if (exchange.hasFetchOrders) {
      let orders = await exchange.fetchOrders(undefined, exchangeAccount.lastSynced.valueOf(), undefined, {}).catch((err: any) => console.log(err));
      if (!orders) return [];
      orders = orders.filter((order) => order.status === 'open');
      return await Promise.all(orders.map((order) => this.orderFromCcxtOrder(order, OrderStatus.OPEN)));
    }

    return [];
  }

  private async transactionFromCcxtTransaction(transaction: ccxt.Transaction): Promise<IDigitalAssetTransaction> {
    const digitalAsset = await this.digitalAssetEntityGateway.getDigitalAssetBySymbol(transaction.currency);

    let assetId = transaction.currency;

    if (digitalAsset) {
      assetId = digitalAsset.assetId;
    }

    const fee: IFee = {
      assetId: assetId,
      rate: transaction.fee?.rate ?? 0,
      cost: transaction.fee?.cost ?? 0
    };

    const digitalAssetTransaction: IDigitalAssetTransaction = {
      address: transaction.address || '',
      amount: transaction.amount,
      assetId: assetId,
      symbol: transaction.currency,
      status: transaction.status as TransactionStatus,
      fee: fee,
      timestamp: transaction.timestamp,
      type: transaction.type === 'deposit' ? Action.DEPOSIT : Action.WITHDRAW
    }

    return digitalAssetTransaction;
  }

  private async transactionFromCcxtLedgerEntry(transaction: CcxtLedgerEntry): Promise<IDigitalAssetTransaction> {
    const digitalAsset = await this.digitalAssetEntityGateway.getDigitalAssetBySymbol(transaction.currency);

    let assetId = transaction.currency;

    if (digitalAsset) {
      assetId = digitalAsset.assetId;
    }

    const digitalAssetTransaction: IDigitalAssetTransaction = {
      address: '',
      amount: transaction.amount,
      assetId: assetId,
      symbol: transaction.currency,
      status: transaction.status as TransactionStatus,
      fee: {
        assetId: transaction.fee.currency,
        rate: 0,
        cost: transaction.fee.cost
      },
      timestamp: transaction.timestamp,
      type: transaction.direction === 'in' ? Action.DEPOSIT : Action.WITHDRAW
    }

    return digitalAssetTransaction;
  }

  private async orderFromCcxtOrder(ccxtOrder: ccxt.Order, status: OrderStatus): Promise<IOrder> {
    const symbols = ccxtOrder.symbol.split('/');
    const digitalAssetBase = await this.digitalAssetEntityGateway.getDigitalAssetBySymbol(symbols[0]);
    const digitalAssetQuote = await this.digitalAssetEntityGateway.getDigitalAssetBySymbol(symbols[1]);

    let assetIdBase = symbols[0];
    let assetIdQuote = symbols[1];

    if (digitalAssetBase) {
      assetIdBase = digitalAssetBase.assetId;
    }

    if (digitalAssetQuote) {
      assetIdQuote = digitalAssetQuote.assetId;
    }

    let feeAssetId = ccxtOrder.fee.currency;

    if (ccxtOrder.fee.currency === symbols[0]) {
      feeAssetId = assetIdBase;
    } else if (ccxtOrder.fee.currency === symbols[1]) {
      feeAssetId = assetIdQuote;
    }
    
    const order: IOrder = {
      timestamp: ccxtOrder.timestamp,
      datetime: ccxtOrder.datetime,
      baseAsset: assetIdBase,
      baseSymbol: symbols[0],
      quoteAsset: assetIdQuote,
      quoteSymbol: symbols[1],
      side: ccxtOrder.side === 'buy' ? Action.BUY: Action.SELL,
      price: ccxtOrder.price,
      amount: ccxtOrder.amount,
      filled: ccxtOrder.filled,
      remaining: ccxtOrder.remaining,
      cost: ccxtOrder.cost,
      status: status,
      fee: { assetId: feeAssetId, ...ccxtOrder.fee }
    }

    return order;
  }
}

type CoinbaseAccount = {
  id: string
  name: string
  primary: boolean
  type: string
  currency: {
    code: string
    name: string
    type: string
  }
  balance: {
    amount: string
    currency: string
  }
}

type CoinbaseAccounts = {
  info: {
    data: CoinbaseAccount[]
  }
}

type CcxtLedgerEntry = {
  account: string
  amount: number
  currency: string
  datetime: string
  direction: string,
  fee: {
    cost: number
    currency: string
  }
  timestamp: number
  status: string
}

export default CcxtExchangeAdapter;