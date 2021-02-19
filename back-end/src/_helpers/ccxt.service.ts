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

export const ccxtService = {
  loadExchange,
  getExchangeRate,
  verifyConnectionToExchange,
  createTransactions,
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
    timeout: 30000,
    enableRateLimit: true,
  });

  return exchange;
}

async function verifyConnectionToExchange(exchange: Exchange) {
  exchange.checkRequiredCredentials();
  //await exchange.fetchBalance();
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

function getRequiredCredentials(exchangeType: exchangeType) {
  const exchangeClass = ccxt[exchangeType];
  const Exchange = new exchangeClass();
  return Exchange.requiredCredentials;
}

function getExchangeRate(baseCurrency: string, quoteCurrency: string): number {
  return 1;
}
