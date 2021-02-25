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
import { fiat } from '../historical/historical.service';
import { privateDecrypt } from 'crypto';
import { isTemplateExpression } from 'typescript';

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

	const exchangeObject = new ExchangeAccount(exchangeParam);
	const savedExchange = await exchangeObject.save();

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

	var exchangeAccount:IExchangeAccount = exchangeAccountDocument.toObject();
	var orders = exchangeAccount.orders;
	var transactions = exchangeAccount.transactions;
	var holdingsHistory = await getHoldingsHistory(exchange, orders, transactions);
	var neededBalances: { symbol: string; balance: ccxt.Balance; holdingHistory: IHoldingSnapshot[]}[] = [];

	const thingsToRemove = ['info', 'free', 'used', 'total'];

	for (var [key, value] of Object.entries(balances)) {
		if (thingsToRemove.includes(key)) continue;
		if (!holdingsHistory[key]) continue;
		neededBalances.push({ symbol: key, balance: value, holdingHistory: holdingsHistory[key] });
	}

	const portfolioItems = await createPortfolioItems(neededBalances);
	exchangeAccountDocument.portfolioItems = portfolioItems;
	return portfolioItems;
}

export interface IHoldingSnapshot
{
	timestamp: number;
	price: { USD: number };
	amountBought: number;
	amountSold: number;
	totalAmountBought: number;
	totalAmountSold: number;
	totalValueReceived: number;
	totalValueInvested: number;
}

export interface IHoldingsHistory
{
  [key: string]: IHoldingSnapshot[]
}

async function getHoldingsHistory(exchange: ccxt.Exchange, orders: IOrder[], transactions: ITransaction[]) {
	var holdingsHistory: IHoldingsHistory = {};

	var mergedList = [...orders, ...transactions].sort((a,b) => a.timestamp - b.timestamp);

	for (let i = 0; i < mergedList.length; i++)
	{
		let item = mergedList[i];

		if (item.hasOwnProperty("side"))
		{
			let order = item as IOrder;
			await addOrderSnapshotToHistory(order, exchange, holdingsHistory);
		}
		else
		{
			let transaction = item as ITransaction
			await addTransactionSnapshotToHistory(transaction, exchange, holdingsHistory);
		}
	}

	return holdingsHistory;
}

async function addTransactionSnapshotToHistory(transaction: ITransaction, exchange: ccxt.Exchange, holdingsHistory: IHoldingsHistory) {
	let currency = transaction.currency;
	let amount = transaction.amount;
	let timestamp = transaction.timestamp;
	let priceInUsd = await getConversionRate(exchange, currency, 'USD', timestamp);

	let snapshot = {
		timestamp: transaction.timestamp,
		price: { USD: 0 },
		amountBought: 0,
		amountSold: 0,
		totalAmountBought: 0,
		totalAmountSold: 0,
		totalValueReceived: 0,
		totalValueInvested: 0,
	};

	let lastSnapshot = { ...snapshot };

	if (!holdingsHistory[currency]) {
		holdingsHistory[currency] = [];
	}

	else {
		let length = holdingsHistory[currency].length;
		if (length > 0)
			lastSnapshot = holdingsHistory[currency][length - 1];
	}

	if (transaction.type == 'deposit') {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought + amount;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold;
		snapshot.amountBought = amount;
		snapshot.amountSold = 0;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested + (amount * priceInUsd);
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived;
		snapshot.price.USD = priceInUsd;
	}

	else {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold + amount;
		snapshot.amountBought = 0;
		snapshot.amountSold = amount;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived + (amount * priceInUsd);
		snapshot.price.USD = priceInUsd;
	}

	holdingsHistory[currency].push(snapshot);
}

async function addOrderSnapshotToHistory(order: IOrder, exchange: ccxt.Exchange, holdingsHistory: IHoldingsHistory) {
	let symbols = order.symbol.split('/');
	let baseCurrency = symbols[0];
	let quoteCurrency = symbols[1];
	let fiatValue = fiat(quoteCurrency);
	let quoteIsFiat = fiatValue != 0;
	let quoteCurrencyInUsd = fiatValue;

	if (baseCurrency == 'ALGO')
	{
		console.log("HERE");
	}

	if (!quoteIsFiat) {
		quoteCurrencyInUsd = await getConversionRate(exchange, quoteCurrency, 'USD', order.timestamp);
	}

	let snapshot = {
		timestamp: order.timestamp,
		price: { USD: 0 },
		amountBought: 0,
		amountSold: 0,
		totalAmountBought: 0,
		totalAmountSold: 0,
		totalValueReceived: 0,
		totalValueInvested: 0,
	};

	let lastSnapshot = { ...snapshot };

	if (!holdingsHistory[baseCurrency]) {
		holdingsHistory[baseCurrency] = [];
	}

	else {
		let length = holdingsHistory[baseCurrency].length;
		if (length > 0)
			lastSnapshot = holdingsHistory[baseCurrency][length - 1];
	}

	if (order.side == 'buy') {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought + order.amount;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold;
		snapshot.amountBought = order.amount;
		snapshot.amountSold = 0;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested + (order.cost * quoteCurrencyInUsd);
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived;
		snapshot.price.USD = order.price ? order.price * quoteCurrencyInUsd : order.cost/order.amount * quoteCurrencyInUsd;
	}

	else {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold + order.amount;
		snapshot.amountBought = 0;
		snapshot.amountSold = order.amount;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived + (order.cost * quoteCurrencyInUsd);
		snapshot.price.USD = order.price ? order.price * quoteCurrencyInUsd : order.cost/order.amount * quoteCurrencyInUsd;
	}

	holdingsHistory[baseCurrency].push(snapshot);
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

async function createPortfolioItems(balances: { symbol: string; balance: ccxt.Balance, holdingHistory: IHoldingSnapshot[]}[]): Promise<IPortfolioItem[]> {
	const portfolioItems: IPortfolioItem[] = [];

	for (var i = 0; i < balances.length; i++) {

		let length = balances[i].holdingHistory.length; 
		let last = balances[i].holdingHistory[length - 1]
		let averageBuyPrice = last.totalValueInvested / last.totalAmountBought;
		let averageSellPrice = last.totalValueReceived / last.totalAmountSold;

		const item: IPortfolioItem = {
			asset: {
				assetId: balances[i].symbol,
				symbol: balances[i].symbol,
				name: balances[i].symbol,
				logoUrl: 'https://seeklogo.com/images/B/bitcoin-logo-DDAEEA68FA-seeklogo.com.png',
			},
			balance: balances[i].balance,
			averageBuyPrice: { USD: averageBuyPrice },
			averageSellPrice: { USD: averageSellPrice },
			amountSold: last.amountSold,
			amountBought: last.amountBought,
			holdingHistory: balances[i].holdingHistory
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

	var totalValue = 0;
	var totalProfit = 0;
	var totalInvested = 0;
	var totalProfitPercentage = 0;

	const formattedPortfolioItems: IPortfolioItemView[] = await Promise.all(
		exchangeAccount.portfolioItems.map(async (item) => {
			const currentPrice = await getConversionRate(exchange, item.asset.symbol, 'USD');
      var currentValue = item.balance.total * currentPrice;
      const profitAllTime = (item.amountSold * item.averageSellPrice.USD) - (item.amountBought * item.averageBuyPrice.USD) + currentValue;
			
			totalProfit += profitAllTime;
			totalValue += currentValue;
			totalInvested += (item.amountBought * item.averageBuyPrice.USD);

			const profitPercentageAllTime = profitAllTime / (item.amountBought * item.averageBuyPrice.USD);
      //const profit24Hour = (amountSoldInTheLast24Hours * averageSellInTheLast24Hours) - (value24HoursAgo * howMuchIHad24HoursAgo) + currentValue
      const profit24Hour = randNum();
			return {
				asset: item.asset,
				amount: item.balance.total,
				value: { USD: currentValue },
				profitTotal: { all: profitAllTime, h24: profit24Hour},
				currentPrice: currentPrice,
				profitPercentage: {
					all: profitPercentageAllTime,
					h24: randNum()
				},
			};
		})
	);

	let portfolioData: IPortfolioDataView = {
		...exchangeAccountJson,
		portfolioItems: formattedPortfolioItems,
		profitPercentage: { USD: (totalValue + totalProfit / totalInvested ) * 100 },
		portfolioTotal: { USD: totalValue },
		profitTotal: { USD: totalProfit },
	};

	return portfolioData;
}