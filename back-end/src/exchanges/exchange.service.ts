import { IUserDocument, User } from '../users/user.model';
import { IExchangeAccountRequest, exchangeType, IExchangeAccountView, IPortfolioDataView, IPortfolioItemView, ITransactionItemView } from '../../../types';
import { ExchangeAccount, IExchangeAccount, IExchangeAccountDocument } from './exchange.model';
import ccxt, { Balances, Exchange } from 'ccxt';
import { IPortfolioItem } from '../portfolios/portfolio.model';
import { ITransaction, ITransactionDocument, Transaction } from '../transactions/transaction.model';
import { randNum } from '../../exchangeDataDetailed';
import { ccxtService } from '../_helpers/ccxt.service';
import { IOrder, IOrderDocument, orderSchema } from '../transactions/order.model';
import { createTransactionViewItems, getConversionRate, saveTransactionViewItems } from '../transactions/transactionView';

export const exchangeService = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getRequiredCredentials,
	getExchangesData,
	getExchangeData,
	syncAllExchangesData,
	syncExchangeData,
};

async function getAll(id: string) {
	const user = await User.findById(id).populate('linkedExchanges');

	if (!user) {
		throw 'User not Found';
	}

	return user.linkedExchanges;
}

async function getById(exchangeId: string) {
	const exchange = await ExchangeAccount.findById(exchangeId);
	if (!exchange) {
		throw 'Exchange not found';
	}

	return exchange;
}

async function create(userId: string, exchangeParam: IExchangeAccountRequest) {
	const user = await User.findById(userId);

	// verify connection to exchange
	const Exchange = ccxtService.loadExchange(exchangeParam);
	await ccxtService.verifyConnectionToExchange(Exchange);

	console.log(await Exchange.fetchOrders());

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
			throw 'Bad Request';
		}
	});

	return savedExchange;
}

async function updatePortfolioItems(exchange: Exchange, exchangeAccountDocument: IExchangeAccountDocument) {
	const balances = await exchange.fetchBalance().catch((err) => {
		throw err;
	});

	var orders = exchangeAccountDocument.orders;
	var transactions = exchangeAccountDocument.transactions;
	var allAssetsEverHeld = getAllAssetsEverHeld(orders, transactions);
	var neededBalances: { symbol: string; balance: ccxt.Balance }[] = [];

	const thingsToRemove = ['info', 'free', 'used', 'total'];

	for (var [key, value] of Object.entries(balances)) {
		if (thingsToRemove.includes(key)) continue;
		if (!allAssetsEverHeld.has(key)) continue;
		neededBalances.push({ symbol: key, balance: value });
	}

	const portfolioItems = await createPortfolioItems(neededBalances);
	exchangeAccountDocument.portfolioItems = portfolioItems;
	return portfolioItems;
}

export interface holdingInfo
{
  [key: string]: {
    amountBought: number;
    amountSold: number;
    totalValueReceived: number;
    totalValueInvested: number;
  }
 }

function getAllAssetsEverHeld(orders: IOrderDocument[], transactions: ITransactionDocument[]) {
	//var holdings: holdingInfo = {};
  var holdings = new Set<string>();

	for (let i = 0; i < orders.length; i++) {
		var symbols = orders[i].symbol.split('/');
    var baseCurrency = symbols[0];
    var quoteCurrency = symbols[1];
    /*
    if (!holdings[baseCurrency])
    {
      holdings[baseCurrency] = {
        amountBought: 0,
        amountSold: 0,
        totalValueReceived: 0,
        totalValueInvested: 0
      };
    }

    if (orders[i].side == 'buy')
    {
      if (quoteCurrency == 'USD')
      {
        holdings[baseCurrency].amountBought += orders[i].amount;
        holdings[baseCurrency].totalValueInvested += orders[i].amount
      }
    }
    */
    holdings.add(baseCurrency);
    holdings.add(quoteCurrency);
	}

	for (let i = 0; i < transactions.length; i++) {
		holdings.add(transactions[i].currency);
	}

	return holdings;
}

async function updateTransactions(exchange: Exchange, exchangeAccountDocument: IExchangeAccountDocument) {
	const ccxtTransactions = await exchange.fetchTransactions().catch((err) => {
		throw err;
	});
	const transactions = await ccxtService.createTransactions(ccxtTransactions);
	exchangeAccountDocument.transactions = transactions;

	return transactions;
}

async function updateOrders(exchange: Exchange, exchangeAccountDocument: IExchangeAccountDocument) {
	var closedOrders: IOrderDocument[] = [];
	var openOrders: IOrderDocument[] = [];

	const ccxtOrders = await exchange.fetchOrders().catch((err) => {
		throw err;
	});

	const orders = await ccxtService.createOrders(ccxtOrders);

	for (var i = 0; i < orders.length; i++) {
		if (orders[i].status == 'open') {
			openOrders.push(orders[i]);
		} else if (orders[i].status == 'closed') {
			closedOrders.push(orders[i]);
		}
	}

	exchangeAccountDocument.orders = closedOrders;
	exchangeAccountDocument.openOrders = openOrders;

	return orders;
}

async function createPortfolioItems(balances: { symbol: string; balance: ccxt.Balance }[]): Promise<IPortfolioItem[]> {
	const portfolioItems: IPortfolioItem[] = [];

	for (var i = 0; i < balances.length; i++) {
		const item: IPortfolioItem = {
			asset: {
				assetId: balances[i].symbol,
				symbol: balances[i].symbol,
				name: balances[i].symbol,
				logoUrl: 'https://seeklogo.com/images/B/bitcoin-logo-DDAEEA68FA-seeklogo.com.png',
			},
			balance: balances[i].balance,
			averageBuyPrice: { USD: randNum() },
			averageSellPrice: { USD: randNum() },
			amountSold: randNum(),
			amountBought: randNum(),
		};

		portfolioItems.push(item);
	}

	return portfolioItems;
}

async function update(userId: string, exchangeId: string, exchangeParam: IExchangeAccountRequest) {
	const user = await User.findById(userId);

	// validate
	if (!user) throw 'User not found';

	const exchange = await ExchangeAccount.findById(exchangeId);

	if (!exchange) throw 'Exchange account not found';

	// copy exchangeParam properties to exchange
	Object.assign(exchange, exchangeParam);

	return await exchange.save();
}

async function _delete(userId: string, exchangeId: string) {
	console.log(userId, exchangeId);
	var user = await User.findById(userId);

	if (!user) throw 'User not found';

	const updatedArray = user.linkedExchanges.filter((item) => {
		return item != exchangeId;
	});

	user.linkedExchanges = updatedArray;

	const exchange = await ExchangeAccount.findByIdAndRemove(exchangeId);

	await user.save();
}

async function getRequiredCredentials(exchangeType: exchangeType) {
	return ccxtService.getRequiredCredentials(exchangeType);
}

async function getExchangesData(userId: string) {
	const user = await User.findById(userId);
	// validate
	if (!user) throw 'User not found';

	let portfolioData: IPortfolioDataView[] = [];

	for (var i = 0; i < user.linkedExchanges.length; i++) {
		const exchangeDocument = await ExchangeAccount.findById(user.linkedExchanges[i]);

		if (!exchangeDocument) throw 'No exchange account was found with the specified id';

		const exchange = ccxtService.loadExchange(exchangeDocument);
		const portfolioDataItem = await createPortfolioData(exchange, exchangeDocument);
		portfolioData.push(portfolioDataItem);
	}

	return portfolioData;
}

async function getExchangeData(userId: string, exchangeId: string) {
	const user = await User.findById(userId);
	if (!user) throw 'User not found';

	if (!user.linkedExchanges.includes(exchangeId)) {
		throw 'The specified exchange account was not found for this user';
	}

	const exchangeDocument = await ExchangeAccount.findById(exchangeId);

	if (!exchangeDocument) throw 'No exchange account was found with the specified id';

	const exchange = ccxtService.loadExchange(exchangeDocument);

	return await createPortfolioData(exchange, exchangeDocument);
}

async function syncAllExchangesData(userId: string) {
	// updateOrders
	// updateTransactions
	// check all exchanges to see if there is new data for the user's
	// update the database with new information

	const user = await User.findById(userId);
	// validate
	if (!user) throw 'User not found';

	let portfolioData: IPortfolioDataView[] = [];

	for (var i = 0; i < user.linkedExchanges.length; i++) {
		const exchangeDocument = await ExchangeAccount.findById(user.linkedExchanges[i]);

		if (!exchangeDocument) throw 'No exchange account was found with the specified id';

		const exchange = ccxtService.loadExchange(exchangeDocument);
		const portfolioDataItem = await syncExchangeData(exchangeDocument.id, exchange).catch((err) => {
			throw err;
		});

		portfolioData.push(portfolioDataItem);
	}

	return portfolioData;
}

async function syncExchangeData(exchangeId: string, exchange: Exchange) {
	const exchangeAccountDocument = await exchangeService.getById(exchangeId);

	if (!exchangeAccountDocument) {
		throw 'Exchange account not found';
	}

	const transactions: ITransaction[] = await updateTransactions(exchange, exchangeAccountDocument);
	const orders: IOrder[] = await updateOrders(exchange, exchangeAccountDocument);
	const portfolioItems: IPortfolioItem[] = await updatePortfolioItems(exchange, exchangeAccountDocument);

  await saveTransactionViewItems(exchange, exchangeAccountDocument);

	const savedExchangeAccount = await exchangeAccountDocument.save().catch((err) => {
		throw err;
	});

	const portfolioData = createPortfolioData(exchange, exchangeAccountDocument);
	return portfolioData;
}

async function createPortfolioData(exchange: ccxt.Exchange, exchangeAccount: IExchangeAccountDocument) {
	var exchangeAccountJson = exchangeAccount.toJSON();
	delete exchangeAccountJson.portfolioItems;

	const formattedPortfolioItems: IPortfolioItemView[] = await Promise.all(
		exchangeAccount.portfolioItems.map(async (item) => {
			const currentPrice = await getConversionRate(exchange, item.asset.symbol, 'USD');
      var currentValue = item.balance.total * currentPrice;
      const profitAllTime = (item.amountSold * item.averageSellPrice.USD) - (item.amountBought * item.averageBuyPrice.USD) + currentValue;
      //const profit24Hour = (amountSoldInTheLast24Hours * averageSellInTheLast24Hours) - (value24HoursAgo * howMuchIHad24HoursAgo) + currentValue
      const profit24Hour = randNum();
			return {
				asset: item.asset,
				amount: item.balance.total,
				value: { USD: currentValue },
				profitTotal: { all: profitAllTime, h24: profit24Hour},
				currentPrice: currentPrice,
				profitPercentage: {
					all: randNum(),
					h24: randNum()
				},
			};
		})
	);

	let portfolioData: IPortfolioDataView = {
		...exchangeAccountJson,
		portfolioItems: formattedPortfolioItems,
		profitPercentage: { USD: randNum() },
		portfolioTotal: { USD: randNum() },
		profitTotal: { USD: randNum() },
	};

	return portfolioData;
}