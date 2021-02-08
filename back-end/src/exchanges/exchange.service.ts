import { IUser, User } from '../users/user.model';
import { IExchangeAccount, IExchangeAccountRequest, ExchangeAccount } from './exchange.model';
import ccxt from 'ccxt';

export const exchangeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(id: string) {
  console.log("got hit");
  const user = await User.findById(id).populate("linkedExchanges");
  
  if (!user) {
    throw("User not Found");
  }

  console.log(user.linkedExchanges);
  return user.linkedExchanges;
}

async function getById(exchangeId: string) {
    const exchange = await ExchangeAccount.findById(exchangeId);

    if (!exchange) {throw('Exchange not found');}

  return exchange;
}

async function create(id: string, exchangeParam: IExchangeAccountRequest) {
  // validate
  const user = await User.findById(id);

    // verify connection to exchange
    const exchangeId = 'coinbasepro'
        , exchangeClass = ccxt[exchangeId]
        , coinbasePro = new exchangeClass ({
            'apiKey': exchangeParam.apiKey,
            'secret': exchangeParam.apiSecret,
            'password': exchangeParam.passphrase,
            'timeout': 30000,
            'enableRateLimit': true,
        });

    const response = await coinbasePro.fetchBalance().then((balances: any) => {
      console.log(balances);
    }).catch((err: any) => { return err; });
    console.log(coinbasePro.requiredCredentials);

    if (response) { return response; }

    //console.log(await coinbasePro.fetchBalance());
    //console.log(coinbasePro.has);
    //console.log(await coinbasePro.fetchMyTrades('XLM/USD'));
    //console.log(await coinbasePro.fetchTicker('XLM/USD'));

    const exchangeObject = new ExchangeAccount(exchangeParam);
    const savedExchange = await exchangeObject.save();

  // save user
  user.save(function (err: any, user: any) {
    if (err) {
      console.log(err);
      throw("Bad Request");
    }
  });

  return savedExchange;
}

async function update(userId: string, exchangeId: string, exchangeParam: IExchangeAccountRequest) {
    const user = await User.findById(userId);

  // validate
  if (!user) throw "User not found";

    const exchange = await ExchangeAccount.findById(exchangeId);

  // copy exchangeParam properties to exchange
  Object.assign(exchange, exchangeParam);

  await exchange.save();
}

async function _delete(userId: string, exchangeId: string) {
    var user = await User.findById(userId);

  if (!user) throw "User not found";

    const updatedArray = user.linkedExchanges.filter((item) => {
      return item != exchangeId
    });

    user.linkedExchanges = updatedArray;

    const exchange = await ExchangeAccount.findByIdAndRemove(exchangeId);

  await user.save();
}
