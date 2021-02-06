const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const User = db.User;
const Exchange = db.Exchange;
const UserService = require("../users/user.service.js");
const userModel = require("../users/user.model");

module.exports = {
  getAll,
  //getById,
  create,
  //update,
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

/*
async function getById(exchangeId) {
    const exchange = await Exchange.findById(exchangeId);

    if (!exchange) {res.send(404, 'Exchange not found')}

    return exchange;    
}
*/

async function create(id, exchangeParam) {
  // validate
  const user = await User.findById(id);

  const exchange = new Exchange(exchangeParam);
  const savedExchange = await exchange.save();

  user.linkedExchanges.push(savedExchange._id);

  // save user
  user.save(function (err, user) {
    if (err) {
      console.log(err);
      res.send(400, "Bad Request");
    }
  });

  return savedExchange;
}

/*
async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}
*/

async function _delete(userId, exchangeId) {
  const user = await User.findByIdAndRemove(userId);
}
