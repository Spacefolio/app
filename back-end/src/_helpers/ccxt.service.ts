import ccxt, { Balances, Exchange } from "ccxt";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import {
  exchangeType,
  IExchangeAccountRequest,
  IExchangeAccountView,
  IIntegrationInfo,
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
  getAvailableExchanges,
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
  if (exchange.hasFetchBalance)
  {
    return await exchange.fetchBalance();
  }
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

const supportedExchanges: IIntegrationInfo[] = [
  {
      "id": "coinbase",
      "name": "Coinbase",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": false,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png"
  },
  {
      "id": "coinbasepro",
      "name": "Coinbase Pro",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": true,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png"
  },
  {
      "id": "kucoin",
      "name": "KuCoin",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": true,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/311.png"
  },
  {
      "id": "binance",
      "name": "Binance",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": false,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
  },
  {
      "id": "binanceus",
      "name": "Binance US",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": false,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
  },
  {
      "id": "hitbtc",
      "name": "HitBTC",
      "requiredCredentials": {
          "apiKey": true,
          "secret": true,
          "uid": false,
          "login": false,
          "password": false,
          "twofa": false,
          "privateKey": false,
          "walletAddress": false,
          "token": false
      },
      "logoUrl": "https://s2.coinmarketcap.com/static/img/exchanges/64x64/42.png"
  }
];

function getAvailableExchanges() : IIntegrationInfo[] {
  return supportedExchanges;
}

function getExchangeRate(baseCurrency: string, quoteCurrency: string): number {
  return 1;
}