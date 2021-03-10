import ccxt, { Balances, Exchange } from "ccxt";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import {
  exchangeType,
  IExchangeAccountRequest,
  IExchangeAccountView,
} from "../../../types";
import {
  ITransaction,
  Transaction,
  ITransactionDocument
} from "../transactions/transaction.model";
import { Order } from "../transactions/order.model";
import { IOrderDocument } from "../transactions/order.model";

export const ccxtService = {
  loadExchange,
  getExchangeRate,
  verifyConnectionToExchange,
  createTransactions,
  createOrders,
  getRequiredCredentials,
};

function loadExchange(
  exchangeAccount:
    | IExchangeAccountView
    | IExchangeAccountRequest
    | IExchangeAccountDocument
) {
  const exchangeClass = ccxt[exchangeAccount.exchangeType];
  const exchange = new exchangeClass({
    apiKey: exchangeAccount.apiInfo.apiKey,
    secret: exchangeAccount.apiInfo.apiSecret,
    password: exchangeAccount.apiInfo.passphrase,
    timeout: 2000,
    enableRateLimit: false,
  });

  return exchange;
}

async function verifyConnectionToExchange(exchange: Exchange) {
  exchange.checkRequiredCredentials();
  //return await exchange.fetchBalance();
}

async function createTransactions(
  ccxtTransactions: ccxt.Transaction[]
): Promise<ITransactionDocument[]> {
  let transactions: ITransactionDocument[] = [];

  transactions = ccxtTransactions.map((ccxtTx) => {
    return new Transaction(ccxtTx);
  });

  return transactions;
}

async function createOrders(
  ccxtOrders: ccxt.Order[]
): Promise<IOrderDocument[]> {
  let orders: IOrderDocument[] = [];

  orders = ccxtOrders.map((ccxtOrder) => {
    return new Order(ccxtOrder);
  });

  return orders;
}

function getRequiredCredentials(exchangeType: exchangeType) {
  const exchangeClass = ccxt[exchangeType];
  const Exchange = new exchangeClass();
  return Exchange.requiredCredentials;
}

function getExchangeRate(baseCurrency: string, quoteCurrency: string): number {
  return 1;
}