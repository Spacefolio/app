import { IUser, User } from "../users/user.model";
import {
  IExchangeAccount,
  IExchangeAccountRequest,
  ExchangeAccount,
} from "./exchange.model";
import ccxt from "ccxt";
import axios from "axios";

export const exchangeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
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

interface IExchangeRef {
  id: string;
  name: string;
  logoUrl: string;
}
async function create(userId: string, exchangeParam: IExchangeAccountRequest) {
  // validate
  const user = await User.findById(userId);

  // verify connection to exchange
  const exchangeId = exchangeParam.exchangeType;
  const exchangeClass = ccxt["coinbasepro"];
  const Exchange = new exchangeClass({
    apiKey: exchangeParam.apiKey,
    secret: exchangeParam.apiSecret,
    password: exchangeParam.passphrase,
    timeout: 30000,
    enableRateLimit: true,
  });

  const response = await Exchange
    .fetchBalance()
    .then((balances: any) => {
      console.log(balances);
    })
    .catch((err: any) => {
      return err;
    });
  console.log(Exchange.requiredCredentials);

  if (response) {
    return response;
  }

  const exchangeObject = new ExchangeAccount(exchangeParam);
  const savedExchange = await exchangeObject.save();

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
