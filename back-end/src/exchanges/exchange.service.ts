import { IUserDocument, User } from "../users/user.model";
import {
  IExchangeAccountRequest,
  exchangeType,
  IPortfolioData
} from "../../../types";
import { ExchangeAccount, IExchangeAccountDocument, IExchangeAccount } from "./exchange.model";
import ccxt, { Balances, Exchange } from "ccxt";
import { IPortfolioItemInterface } from "../portfolios/models/portfolio.model";
import {
  ITransaction,
  Transaction,
} from "../portfolios/models/transaction.model";
import { randNum } from "../../exchangeDataDetailed";
import { json } from "express";

export const exchangeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getRequiredCredentials,
  syncAllExchangesData,
  syncExchangeData,
};

async function getAll(id: string) {
  const user = await User.findById(id).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  return user.linkedExchanges;
}

async function getById(exchangeId: string) {
  const exchange = await ExchangeAccount.findById(exchangeId);
  if (!exchange) {
    throw "Exchange not found";
  }

  return exchange;
}

async function create(userId: string, exchangeParam: IExchangeAccountRequest) {
  const user = await User.findById(userId);

  // verify connection to exchange
  const Exchange = loadExchange(exchangeParam);
  await verifyConnectionToExchange(Exchange);

  const exchangeObject = new ExchangeAccount(exchangeParam);
  const savedExchange = await exchangeObject.save();

  await syncExchangeData(savedExchange.id, Exchange).catch((err) => {
    throw err;
  });

  user.linkedExchanges.push(savedExchange.id);

  // save user
  user.save(function (err: any, user: any) {
    if (err) {
      console.log(err);
      throw "Bad Request";
    }
  });

  return savedExchange;
}

async function updatePortfolioItems(
  exchange: Exchange,
  exchangeAccountDocument: IExchangeAccountDocument
) {
  const balances = await exchange.fetchBalance().catch((err) => {
    throw err;
  });
  const portfolioItems = await createPortfolioItems(balances);
  exchangeAccountDocument.portfolioItems = portfolioItems;
  return portfolioItems;
}

async function updateTransactions(
  exchange: Exchange,
  exchangeAccountDocument: IExchangeAccountDocument
) {
  const ccxtTransactions = await exchange.fetchTransactions().catch((err) => {
    throw err;
  });
  const transactions = await createTransactions(ccxtTransactions);
  exchangeAccountDocument.transactions = transactions;

  return transactions;
}

async function createPortfolioItems(
  balances: Balances
): Promise<IPortfolioItemInterface[]> {
  const portfolioItems: IPortfolioItemInterface[] = [];
  const thingsToRemove = ["info", "free", "used", "total"];

  for (var [key, value] of Object.entries(balances)) {
    if (thingsToRemove.includes(key)) continue;
    if (value.total <= 0) continue;

    portfolioItems.push({
      asset: {
        assetId: key,
        symbol: key,
        name: key,
        logoUrl:
          "https://seeklogo.com/images/B/bitcoin-logo-DDAEEA68FA-seeklogo.com.png",
      },
      balance: value,
    });
  }

  return portfolioItems;
}

async function createTransactions(
  ccxtTransactions: ccxt.Transaction[]
): Promise<ITransaction[]> {
  let transactions: ITransaction[] = [];

  transactions = ccxtTransactions.map((ccxtTx) => {
    return new Transaction(ccxtTx);
  });

  return transactions;
}

async function update(
  userId: string,
  exchangeId: string,
  exchangeParam: IExchangeAccountRequest
) {
  const user = await User.findById(userId);

  // validate
  if (!user) throw "User not found";

  const exchange = await ExchangeAccount.findById(exchangeId);

  if (!exchange) throw "Exchange account not found";

  // copy exchangeParam properties to exchange
  Object.assign(exchange, exchangeParam);

  return await exchange.save();
}

async function _delete(userId: string, exchangeId: string) {
  console.log(userId, exchangeId);
  var user = await User.findById(userId);

  if (!user) throw "User not found";

  const updatedArray = user.linkedExchanges.filter((item) => {
    return item != exchangeId;
  });

  user.linkedExchanges = updatedArray;

  const exchange = await ExchangeAccount.findByIdAndRemove(exchangeId);

  await user.save();
}

async function getRequiredCredentials(exchangeType: exchangeType) {
  // verify connection to exchange
  const exchangeClass = ccxt[exchangeType];
  const Exchange = new exchangeClass();

  return Exchange.requiredCredentials;
}

async function syncAllExchangesData(userId: string) {
  // updateOrders
  // updateTransactions
  // check all exchanges to see if there is new data for the user's
  // update the database with new information

  const user = await User.findById(userId);
  // validate
  if (!user) throw "User not found";

  let portfolioData: IPortfolioData[] = [];

  for (var i = 0; i < user.linkedExchanges.length; i++) {
    const exchangeDocument = await ExchangeAccount.findById(
      user.linkedExchanges[i]
    );

    if (!exchangeDocument)
      throw "No exchange account was found with the specified id";

    const exchange = loadExchange(exchangeDocument);
    const portfolioDataItem = await syncExchangeData(
      exchangeDocument.id,
      exchange
    ).catch((err) => {
      throw err;
    });

    portfolioData.push(portfolioDataItem)
  }

  return portfolioData;
}

async function syncExchangeData(exchangeId: string, exchange: Exchange) {
  const exchangeAccountDocument = await exchangeService.getById(exchangeId);

  if (!exchangeAccountDocument) {
    throw "Exchange account not found";
  }

  const portfolioItems: IPortfolioItemInterface[] = await updatePortfolioItems(
    exchange,
    exchangeAccountDocument
  );
  const transactions: ITransaction[] = await updateTransactions(
    exchange,
    exchangeAccountDocument
  );

  const savedExchangeAccount = await exchangeAccountDocument
    .save()
    .catch((err) => {
      throw err;
    });

  const portfolioData = createPortfolioData(
    savedExchangeAccount,
    portfolioItems,
    transactions
  );
  return portfolioData;
}

function createPortfolioData(
  exchangeAccount: IExchangeAccountDocument,
  portfolioItems: IPortfolioItemInterface[],
  transanction: ITransaction[]
) {
  delete exchangeAccount.portfolioItems;
  const jsonExchangeAccount = exchangeAccount.toJSON();
  const formattedPortfolioItems = portfolioItems.map((item) => ({
    ...item,
    balance: item.balance.total,
    profitTotal: { all: randNum(), h24: randNum(), lastTrade: randNum() },
    currentPrice: randNum(),
    profitPercentage: { all: randNum(), h24: randNum(), lastTrade: randNum() },
  }));
  let portfolioData: IPortfolioData = {
    ...jsonExchangeAccount,
    portfolioItems: formattedPortfolioItems,
    profitPercentage: randNum(),
    portfolioTotal: randNum(),
    profitTotal: randNum(),
  };

  return portfolioData;
}

function loadExchange(
  exchangeAccount:
    | IExchangeAccount
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
