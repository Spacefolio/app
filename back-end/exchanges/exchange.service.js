const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Exchange = db.Exchange;
const UserService = require("../users/user.service.js");
const userModel = require("../users/user.model");
const ccxt = require("ccxt");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(id) {
  console.log("got hit");
  const user = await User.findById(id).populate("linkedExchanges");
  if (!user) {
    res.send(404, "User not Found");
  }
  console.log(user.linkedExchanges);
  return user.linkedExchanges;
}

async function getById(exchangeId) {
  const exchange = await Exchange.findById(exchangeId);

  if (!exchange) {
    res.send(404, "Exchange not found");
  }

  return exchange;
}

async function create(id, exchangeParam) {
  // validate
  const user = await User.findById(id);

  // verify connection to exchange
  const exchangeId = "coinbasepro",
    exchangeClass = ccxt[exchangeId],
    coinbasePro = new exchangeClass({
      apiKey: exchangeParam.apiKey,
      secret: exchangeParam.apiSecret,
      password: exchangeParam.passphrase,
      timeout: 30000,
      enableRateLimit: true,
    });

  // console.log(coinbasePro.requiredCredentials);
  //console.log(await coinbasePro.fetchBalance());
  //console.log(coinbasePro.has);
  //console.log(await coinbasePro.fetchMyTrades('XLM/USD'));
  // console.log(await coinbasePro.fetchTicker('XLM/USD'));

  const exchangeObject = new Exchange(exchangeParam);
  const savedExchange = await exchangeObject.save();

  // save user
  user.save(function (user, err) {
    if (err) {
      console.log(err);
      res.send(400, "Bad Request");
    }
  });

  return savedExchange;
}

async function update(userId, exchangeId, exchangeParam) {
  const user = await User.findById(userId);

  // validate
  if (!user) throw "User not found";

  const exchange = await Exchange.findById(exchangeId);

  // copy exchangeParam properties to exchange
  Object.assign(exchange, exchangeParam);

  await exchange.save();
}

async function _delete(userId, exchangeId) {
  const user = await User.findById(userId);

  if (!user) throw "User not found";

  user.linkedExchanges.remove(exchangeId);

  const exchange = await Exchange.findByIdAndRemove(exchangeId);

  await user.save();
}
