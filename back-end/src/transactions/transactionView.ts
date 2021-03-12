import {
  IExchangeAccount,
  IExchangeAccountDocument,
} from "../exchanges/exchange.model";
import { ITransactionItemView } from "../../../types";
import { IOrder, IOrderDocument } from "../orders/order.model";
import { ITransaction, ITransactionDocument } from "./transaction.model";
import { ccxtService } from "../exchanges/_helpers/ccxt.service";
import ccxt from "ccxt";
import { Db } from "mongodb";
import { fiat, getHistoricalData } from "../assets/historical.service";
import { getCurrentPrice } from "../assets/coindata.service";
import { getCoinLogo } from "../assets";

export async function createTransactionViewItems(
  exchange: IExchangeAccountDocument
): Promise<ITransactionItemView[]> {
  const transactionViewItems: ITransactionItemView[] = [];
  const ccxtExchange = ccxtService.loadExchange(exchange);

  for (var i = 0; i < exchange.transactions.length; i++) {
    let transaction: ITransactionDocument = exchange.transactions[i];
    let transactionItem: ITransactionItemView = await convertTransactionToTransactionView(
      ccxtExchange,
      exchange,
      transaction
    );
    transactionViewItems.push(transactionItem);
  }

  for (var i = 0; i < exchange.orders.length; i++) {
    let order: IOrderDocument = exchange.orders[i];
    let transactionItem: ITransactionItemView = await convertOrderToTransactionView(
      ccxtExchange,
      exchange,
      order
    );
    transactionViewItems.push(transactionItem);
  }

  return transactionViewItems;
}

export async function saveTransactionViewItems(
  ccxtExchange: ccxt.Exchange,
  exchange: IExchangeAccountDocument,
  newOrdersCount: number,
  newTransactionsCount: number
) {
  for (
    var i = exchange.transactions.length - newTransactionsCount;
    i < exchange.transactions.length;
    i++
  ) {
    let transaction: ITransactionDocument = exchange.transactions[i];
    let transactionItem: ITransactionItemView = await convertTransactionToTransactionView(
      ccxtExchange,
      exchange,
      transaction
    );
    exchange.transactionViewItems.push(transactionItem);
  }

  for (
    var i = exchange.orders.length - newOrdersCount;
    i < exchange.orders.length;
    i++
  ) {
    let order: IOrderDocument = exchange.orders[i];
    let transactionItem: ITransactionItemView = await convertOrderToTransactionView(
      ccxtExchange,
      exchange,
      order
    );
    exchange.transactionViewItems.push(transactionItem);
  }
}

export async function createTransactionViewItemsForOpenOrders(
  exchange: IExchangeAccountDocument
): Promise<ITransactionItemView[]> {
  const transactionViewItems: ITransactionItemView[] = [];

  for (var i = 0; i < exchange.openOrders.length; i++) {
    let order: IOrderDocument = exchange.openOrders[i];
    let transactionItem: ITransactionItemView = await convertOpenOrderToTransactionView(
      exchange,
      order
    );
    transactionViewItems.push(transactionItem);
  }

  return transactionViewItems;
}

export async function convertOrderToTransactionView(
  ccxtExchange: ccxt.Exchange,
  exchange: IExchangeAccountDocument,
  order: IOrderDocument
): Promise<ITransactionItemView> {
  var baseSymbol = getBaseSymbol(order.symbol);
  var quoteSymbol = getQuoteSymbol(order.symbol);
  var priceInUsd = order.price ? order.price : order.cost / order.filled;
  var valueInUsd = order.cost;

  if (quoteSymbol != "USD") {
    const conversionRate = await getConversionRate(
      ccxtExchange,
      quoteSymbol,
      "USD",
      order.timestamp
    );
    priceInUsd = conversionRate * priceInUsd;
    valueInUsd = order.amount * priceInUsd;
  }

  const transactionView: ITransactionItemView = {
    id: order.id,
    exchangeName: exchange.name,
    symbol: baseSymbol,
    quoteSymbol: getQuoteSymbol(order.symbol),
    logoUrl: await getCoinLogo(baseSymbol),
    type: order.side,
    date: order.timestamp,
    amount: order.filled,
    quoteAmount: order.cost,
    price: priceInUsd,
    value: valueInUsd,
    fee: order.fee,
  };

  return transactionView;
}

export async function convertTransactionToTransactionView(
  ccxtExchange: ccxt.Exchange,
  exchange: IExchangeAccountDocument,
  transaction: ITransactionDocument
): Promise<ITransactionItemView> {
  var priceInUsd = 1;
  if (transaction.currency != "USD") {
    priceInUsd = await getConversionRate(
      ccxtExchange,
      transaction.currency,
      "USD",
      transaction.timestamp
    );
  }
  //const quoteAmount = getQuoteAmountAtTime(ccxtExchange, transaction.timestamp, transaction.currency, transaction.amount, "USD");

  const transactionView: ITransactionItemView = {
    id: transaction.id,
    exchangeName: exchange.name,
    symbol: transaction.currency,
    quoteSymbol: transaction.currency,
    logoUrl: await getCoinLogo(transaction.currency),
    type: transaction.type,
    date: transaction.timestamp,
    amount: transaction.amount,
    quoteAmount: transaction.amount,
    price: priceInUsd,
    value: transaction.amount * priceInUsd,
    fee: transaction.fee,
  };
  return transactionView;
}

export async function convertOpenOrderToTransactionView(
  exchange: IExchangeAccountDocument,
  order: IOrderDocument
): Promise<ITransactionItemView> {
  var baseSymbol = getBaseSymbol(order.symbol);
  var quoteSymbol = getQuoteSymbol(order.symbol);

  var priceInQuote = order.price;

  const transactionView: ITransactionItemView = {
    id: order.id,
    exchangeName: exchange.name,
    symbol: baseSymbol,
    quoteSymbol: getQuoteSymbol(order.symbol),
    logoUrl: await getCoinLogo(baseSymbol),
    type: order.side,
    date: order.timestamp,
    amount: order.amount,
    quoteAmount: order.cost,
    price: priceInQuote,
    value: 0,
    fee: order.fee,
  };

  return transactionView;
}

export function getBaseSymbol(symbol: string): string {
  var symbols = symbol.split("/");
  return symbols.length > 1 ? symbols[0] : "ERR";
}

export function getQuoteSymbol(symbol: string): string {
  var symbols = symbol.split("/");
  return symbols.length > 1 ? symbols[1] : "ERR";
}

export async function getConversionRate(
  exchange: ccxt.Exchange,
  baseCurrency: string,
  quoteCurrency: string,
  timestamp?: number
): Promise<number> {
  let symbol = baseCurrency + "/" + quoteCurrency;
  let fiatValue = fiat(symbol);
  if (fiatValue != 0) return fiatValue;

  let sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  if (timestamp == undefined) {
    return await getCurrentPrice(baseCurrency).catch(async (err: any) => {
      if (!exchange.has.fetchTicker) throw "Exchange does not have fetchTicker";
      return sleep(exchange.rateLimit)
        .then(() => exchange.fetchTicker(symbol))
        .then((ticker: ccxt.Ticker) => {
          return ticker.last ? ticker.last : (ticker.high + ticker.low) / 2;
        })
        .catch((err) => {
          return 1;
        });
    });
  }

  return await getHistoricalData(symbol, timestamp).catch(async () => {
    if (!exchange.has.fetchOHLCV) throw "Exchange does not have fetchOHLCV";
    return sleep(exchange.rateLimit)
      .then(() =>
        exchange
          .fetchOHLCV(symbol, "1m", timestamp, 1)
          .then((ohlcv: ccxt.OHLCV[]) => {
            return (ohlcv[0][1] + ohlcv[0][4]) / 2;
          })
      )
      .catch((err) => {
        return 1;
      });
  });
}
