import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import { ITransactionItemView } from "../../../types";
import { IOrderDocument } from "./order.model";
import { ITransactionDocument } from "./transaction.model";

export function createTransactionViewItems(exchange: IExchangeAccountDocument) : ITransactionItemView[]
{
  const transactionViewItems: ITransactionItemView[] = [];

  for (var i = 0; i < exchange.transactions.length; i++)
  {
    var transaction: ITransactionDocument = exchange.transactions[i];
    var transactionItem: ITransactionItemView = convertTransactionToTransactionView(exchange, transaction);
    transactionViewItems.push(transactionItem);
  }

  for (var i = 0; i < exchange.orders.length; i++)
  {
    var order: IOrderDocument = exchange.orders[i];
    var transactionItem: ITransactionItemView = convertOrderToTransactionView(exchange, order);
    transactionViewItems.push(transactionItem);
  }

  return transactionViewItems;
}

export function convertOrderToTransactionView(exchange: IExchangeAccountDocument, order: IOrderDocument) : ITransactionItemView
{
  var baseSymbol = getBaseSymbol(order.symbol);
  var quoteSymbol = getQuoteSymbol(order.symbol);
  var priceInUsd = order.price;
  var valueInUsd = order.cost;

  if (quoteSymbol != "USD")
  {
    const conversionRate = getConversionRateAtTime(order.timestamp, "USD", quoteSymbol);
    priceInUsd = conversionRate * priceInUsd;
    valueInUsd = conversionRate * valueInUsd;
  }
  
  const transactionView: ITransactionItemView = {
    id: order.id,
    exchangeName: exchange.name,
    symbol: baseSymbol,
    quoteSymbol: getQuoteSymbol(order.symbol),
    logoUrl: getLogoUrlForSymbol(baseSymbol),
    type: order.side,
    date: order.timestamp,
    amount: order.amount,
    quoteAmount: order.cost,
    price: priceInUsd,
    value: valueInUsd,
    fee: order.fee
  };

  return transactionView;
}

export function convertTransactionToTransactionView(exchange: IExchangeAccountDocument, transaction: ITransactionDocument) : ITransactionItemView
{

  const priceInUsd = getConversionRateAtTime(transaction.timestamp, "USD", transaction.currency);
  const quoteAmount = getQuoteAmountAtTime(transaction.timestamp, transaction.currency, transaction.amount, "USD");

  const transactionView: ITransactionItemView = {
    id: transaction.id,
    exchangeName: exchange.name,
    symbol: transaction.currency,
    quoteSymbol: transaction.currency,
    logoUrl: getLogoUrlForSymbol(transaction.currency),
    type: transaction.type,
    date: transaction.timestamp,
    amount: transaction.amount,
    quoteAmount: quoteAmount,
    price: priceInUsd,
    value: transaction.amount * priceInUsd,
    fee: transaction.fee
  }
  return transactionView;
}

export function getBaseSymbol(symbol: string) : string
{
  var symbols = symbol.split("/");
  return symbols.length > 1 ? symbols[0] : "ERR";
}

export function getQuoteSymbol(symbol: string) : string
{
  var symbols = symbol.split("/");
  return symbols.length > 1 ? symbols[1] : "ERR";
}

export function getLogoUrlForSymbol(symbol: string)
{
  return "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png";
}

export function getQuoteAmountAtTime(timestamp: number, baseCurrency: string, baseAmount: number, quoteCurrency: string) : number
{
  const conversionRate = getConversionRateAtTime(timestamp, quoteCurrency, baseCurrency);
  return baseAmount * conversionRate;
}

export function getConversionRateAtTime(timestamp: number, baseCurrency: string, quoteCurrency: string) : number
{
  /// TODO: implement conversion rate calculation in ccxtService
  // baseCurrency/quoteCurrency = conversionRate
  return 1;
}
