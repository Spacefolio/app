import { User } from '../users/user.model';
import {
  IExchangeAccountRequest,
  exchangeType,
  IExchangeAccount
} from "../../../types";
import { ExchangeAccount } from './exchange.model';
import ccxt from "ccxt";

export const exchangeService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getRequiredCredentials,
  syncExchangeData
};

async function getAll(id: string) {
  const user = await User.findById(id).populate("linkedExchanges");

  if (!user) {
    throw "User not Found";
  }

  return user.linkedExchanges;
}

async function getAssets(exchangeId: string)
{
  const exchange:IExchangeAccount = await ExchangeAccount.findById(exchangeId).populate("portfolioItems");
  if (!exchange) { throw "Exchange not found"; }
  
  const Exchange = createExchange(exchange);

  const response = await Exchange
    .fetchBalance()
    .then((balances: any) => {
      //console.log(balances);
    })
    .catch((err: any) => {
      return err;
    });
}

async function getById(exchangeId: string) {
  const exchange = await ExchangeAccount.findById(exchangeId);
  if (!exchange) { throw "Exchange not found"; }

  return exchange;
}

async function create(userId: string, exchangeParam: IExchangeAccountRequest) {
  // validate
  
  const user = await User.findById(userId);

  // verify connection to exchange
  const Exchange = createExchange(exchangeParam);
  const response = await Exchange
    .fetchBalance()
    .then((balances: any) => {
      console.log(balances);
    })
    .catch((err: any) => {
      return err;
    });
  
  console.log(Exchange);
  return Exchange;
  //console.log(Exchange.requiredCredentials);

  if (response) {
    throw response.message;
  }
   
  const exchangeObject = new ExchangeAccount(exchangeParam);
   console.log("exchangeParam",exchangeParam);
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

async function getRequiredCredentials(exchangeType: exchangeType)
{
  // verify connection to exchange
  const exchangeClass = ccxt[exchangeType];
  const Exchange = new exchangeClass();

  return Exchange.requiredCredentials;
}

async function syncExchangeData(userId: string)
{
  // updateOrders
  // updateTransactions
  // check all exchanges to see if there is new data for the user's 
  // update the database with new information
 
  

  const snooze = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const sleep = async () => {
    console.log('About to snooze without halting the event loop');
    await snooze(3000);
    console.log('done!');
  }

  await sleep();
}

async function getUpdatedPortfolioValues(userId: string)
{
  return
}

async function getCoinData(coinId: string)
{
  /* Get updated coin metadata and price data */
}

function createExchange(exchangeAccount: IExchangeAccount|IExchangeAccountRequest)
{
  const exchangeClass = ccxt[exchangeAccount.exchangeType];
  return new exchangeClass({
    apiKey: exchangeAccount.apiInfo.apiKey,
    secret: exchangeAccount.apiInfo.apiSecret,
    password: exchangeAccount.apiInfo.passphrase,
    timeout: 30000,
    enableRateLimit: true,
  });
}
