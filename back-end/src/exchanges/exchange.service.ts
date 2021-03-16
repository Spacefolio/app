import { User } from '../users/user.model';
import { IExchangeAccountRequest, IPortfolioDataView, IPortfolioItemView, IOpenOrderItemView, ITransactionItemView } from '../../../types';
import { ExchangeAccount, IExchangeAccountDocument, IHoldingsHistory, IHoldingSlice, IHoldingSnapshot, ITimeslice, ITimeslices } from './exchange.model';
import ccxt, { Exchange } from 'ccxt';
import { IPortfolioItem } from '../portfolios/portfolio.model';
import { ITransaction } from '../transactions/transaction.model';
import { randNum } from '../../exchangeDataDetailed';
import { ccxtService } from '../_helpers/ccxt.service';
import { IOrder } from '../transactions/order.model';
import { getConversionRate, saveTransactionViewItems } from '../transactions/transactionView';
import { fiat, getHistoricalData } from '../coindata/historical.service';
import { coindataService } from '../coindata/coindata.service';
import { IDailyPrice } from '../coindata/historical.model';

export const exchangeService = {
	getAll,
	getById,
	create,
	update,
	delete: _delete,
	getAvailableExchanges,
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

async function updatePortfolioItems(
	exchange: Exchange,
	exchangeAccountDocument: IExchangeAccountDocument,
	orders: IOrder[],
	transactions: ITransaction[],
	balances: ccxt.Balances
) {
	var holdingsHistory = await getHoldingsHistory(exchangeAccountDocument, exchange, orders, transactions);
	var neededBalances: {
		symbol: string;
		balance: ccxt.Balance;
		holdingHistory: IHoldingSnapshot[];
	}[] = [];

	const thingsToRemove = ['info', 'free', 'used', 'total'];

	if (exchange.id == 'binance' || exchange.id == 'binanceus') {
		for (var [key, value] of Object.entries(balances)) {
			if (thingsToRemove.includes(key)) continue;
			if (value.total <= 0) continue;
			let holdingHistory = holdingsHistory[key] ? holdingsHistory[key] : [];
			neededBalances.push({
				symbol: key,
				balance: value,
				holdingHistory,
			});
		}
	} else {
		for (var [key, value] of Object.entries(balances)) {
			if (thingsToRemove.includes(key)) continue;
			if (!holdingsHistory[key]) continue;
			neededBalances.push({
				symbol: key,
				balance: value,
				holdingHistory: holdingsHistory[key],
			});
		}
	}

	const portfolioItems = await createPortfolioItems(neededBalances);
	exchangeAccountDocument.portfolioItems = portfolioItems;
	return portfolioItems;
}

async function getHoldingsHistory(
	exchangeAccountDocument: IExchangeAccountDocument,
	exchange: ccxt.Exchange,
	orders: IOrder[],
	transactions: ITransaction[]
) {
	var holdingsHistory: IHoldingsHistory = {};

	for (let i = 0; i < exchangeAccountDocument.portfolioItems.length; i++) {
		let item = exchangeAccountDocument.portfolioItems[i];
		holdingsHistory[item.asset.symbol] = item.holdingHistory;
	}

	var mergedList = [...orders, ...transactions].sort((a, b) => a.timestamp - b.timestamp);

	for (let i = 0; i < mergedList.length; i++) {
		let item = mergedList[i];

		if (item.hasOwnProperty('side')) {
			let order = item as IOrder;
			await addOrderSnapshotToHistory(order, exchange, holdingsHistory);
		} else {
			let transaction = item as ITransaction;
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
		totalValueDeposited: 0,
		totalValueWithdrawn: 0,
		totalAmountDeposited: 0,
		totalAmountWithdrawn: 0,
	};

	let lastSnapshot = { ...snapshot };

	if (!holdingsHistory[currency]) {
		holdingsHistory[currency] = [];
	} else {
		let length = holdingsHistory[currency].length;
		if (length > 0) lastSnapshot = holdingsHistory[currency][length - 1];
	}

	var fee = transaction.fee ? transaction.fee.cost : 0;

	if (transaction.type == 'deposit') {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought + amount;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold;
		snapshot.amountBought = amount;
		snapshot.amountSold = 0;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested + amount * priceInUsd;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived;
		snapshot.price.USD = priceInUsd;
		snapshot.totalValueDeposited = lastSnapshot.totalValueDeposited + (amount * priceInUsd);
		snapshot.totalValueWithdrawn = lastSnapshot.totalValueWithdrawn;
		snapshot.totalAmountDeposited = lastSnapshot.totalAmountDeposited + amount;
		snapshot.totalAmountWithdrawn = lastSnapshot.totalAmountWithdrawn;
	} else {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold + amount + fee;
		snapshot.amountBought = 0;
		snapshot.amountSold = amount + fee;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived + (amount - fee) * priceInUsd;
		snapshot.price.USD = priceInUsd;
		snapshot.totalValueDeposited = lastSnapshot.totalValueDeposited;
		snapshot.totalValueWithdrawn = lastSnapshot.totalValueWithdrawn + (amount + fee) * priceInUsd;
		snapshot.totalAmountDeposited = lastSnapshot.totalAmountDeposited;
		snapshot.totalAmountWithdrawn = lastSnapshot.totalAmountWithdrawn + (amount + fee);
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
		totalValueDeposited: 0,
		totalValueWithdrawn: 0,
		totalAmountDeposited: 0,
		totalAmountWithdrawn: 0,
	};

	let lastSnapshot = { ...snapshot };

	if (!holdingsHistory[baseCurrency]) {
		holdingsHistory[baseCurrency] = [];
	} else {
		let length = holdingsHistory[baseCurrency].length;
		if (length > 0) lastSnapshot = holdingsHistory[baseCurrency][length - 1];
	}

	let orderCost = order.cost + order.fee.cost;

	if (order.side == 'buy') {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought + order.filled;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold;
		snapshot.amountBought = order.filled;
		snapshot.amountSold = 0;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested + orderCost * quoteCurrencyInUsd;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived;
		snapshot.price.USD = order.price ? order.price * quoteCurrencyInUsd : (order.cost / order.filled) * quoteCurrencyInUsd;
		snapshot.totalValueDeposited = lastSnapshot.totalValueDeposited;
		snapshot.totalValueWithdrawn = lastSnapshot.totalValueWithdrawn;
		snapshot.totalAmountDeposited = lastSnapshot.totalAmountDeposited;
		snapshot.totalAmountWithdrawn = lastSnapshot.totalAmountWithdrawn;
	} else {
		snapshot.totalAmountBought = lastSnapshot.totalAmountBought;
		snapshot.totalAmountSold = lastSnapshot.totalAmountSold + order.filled;
		snapshot.amountBought = 0;
		snapshot.amountSold = order.filled;
		snapshot.totalValueInvested = lastSnapshot.totalValueInvested;
		snapshot.totalValueReceived = lastSnapshot.totalValueReceived + (order.cost - order.fee.cost) * quoteCurrencyInUsd;
		snapshot.price.USD = order.price ? order.price * quoteCurrencyInUsd : (order.cost / order.filled) * quoteCurrencyInUsd;
		snapshot.totalValueDeposited = lastSnapshot.totalValueDeposited;
		snapshot.totalValueWithdrawn = lastSnapshot.totalValueWithdrawn;
		snapshot.totalAmountDeposited = lastSnapshot.totalAmountDeposited;
		snapshot.totalAmountWithdrawn = lastSnapshot.totalAmountWithdrawn;
	}

	let snapshotQuote = {
		timestamp: order.timestamp,
		price: { USD: 0 },
		amountBought: 0,
		amountSold: 0,
		totalAmountBought: 0,
		totalAmountSold: 0,
		totalValueReceived: 0,
		totalValueInvested: 0,
		totalValueDeposited: 0,
		totalValueWithdrawn: 0,
		totalAmountDeposited: 0,
		totalAmountWithdrawn: 0,
	};

	let lastSnapshotQuote = { ...snapshotQuote };

	if (!holdingsHistory[quoteCurrency]) {
		holdingsHistory[quoteCurrency] = [];
	} else {
		let length = holdingsHistory[quoteCurrency].length;
		if (length > 0) lastSnapshotQuote = holdingsHistory[quoteCurrency][length - 1];
	}

	if (order.side == 'buy') {
		// count as a sell of the quote currency
		snapshotQuote.totalAmountBought = lastSnapshotQuote.totalAmountBought;
		snapshotQuote.totalAmountSold = lastSnapshotQuote.totalAmountSold + orderCost;
		snapshotQuote.amountBought = 0;
		snapshotQuote.amountSold = orderCost;
		snapshotQuote.totalValueInvested = lastSnapshotQuote.totalValueInvested;
		snapshotQuote.totalValueReceived = lastSnapshotQuote.totalValueReceived + order.cost * quoteCurrencyInUsd;
		snapshotQuote.price.USD = quoteCurrencyInUsd;
		snapshotQuote.totalValueDeposited = lastSnapshotQuote.totalValueDeposited;
		snapshotQuote.totalValueWithdrawn = lastSnapshotQuote.totalValueWithdrawn;
		snapshotQuote.totalAmountDeposited = lastSnapshotQuote.totalAmountDeposited;
		snapshotQuote.totalAmountWithdrawn = lastSnapshotQuote.totalAmountWithdrawn;
	} else {
		// count as a buy of the quote currency
		snapshotQuote.totalAmountBought = lastSnapshotQuote.totalAmountBought + order.cost - order.fee.cost;
		snapshotQuote.totalAmountSold = lastSnapshotQuote.totalAmountSold;
		snapshotQuote.amountBought = order.cost - order.fee.cost;
		snapshotQuote.amountSold = 0;
		snapshotQuote.totalValueInvested = lastSnapshotQuote.totalValueInvested + order.cost * quoteCurrencyInUsd;
		snapshotQuote.totalValueReceived = lastSnapshotQuote.totalValueReceived;
		snapshotQuote.price.USD = quoteCurrencyInUsd;
		snapshotQuote.totalValueDeposited = lastSnapshotQuote.totalValueDeposited;
		snapshotQuote.totalValueWithdrawn = lastSnapshotQuote.totalValueWithdrawn;
		snapshotQuote.totalAmountDeposited = lastSnapshotQuote.totalAmountDeposited;
		snapshotQuote.totalAmountWithdrawn = lastSnapshotQuote.totalAmountWithdrawn;
	}

	holdingsHistory[baseCurrency].push(snapshot);
	holdingsHistory[quoteCurrency].push(snapshotQuote);
}

async function updateTransactions(exchange: Exchange, exchangeAccountDocument: IExchangeAccountDocument) {
	//var time = Date.now();
	var ccxtTransactions: ccxt.Transaction[] = [];
	if (!exchange.hasFetchTransactions) {
		if (!exchange.hasFetchDeposits && !exchange.hasFetchWithdrawals) return [];

		if (exchange.hasFetchDeposits) {
			let deposits = await exchange
				.fetchDeposits(undefined, exchangeAccountDocument.lastSyncedDate.valueOf(), undefined, {})
				.catch((err) => {
					throw err;
				});

			ccxtTransactions = ccxtTransactions.concat(deposits);
		}

		if (exchange.hasFetchWithdrawals) {
			let withdrawals = await exchange
				.fetchWithdrawals(undefined, exchangeAccountDocument.lastSyncedDate.valueOf(), undefined, {})
				.catch((err) => {
					throw err;
				});

			ccxtTransactions = ccxtTransactions.concat(withdrawals);
		}
	} else {
		ccxtTransactions = await exchange
			.fetchTransactions(undefined, exchangeAccountDocument.lastSyncedDate.valueOf(), undefined, {})
			.catch((err) => {
				throw err;
			});
	}
	//console.log("Fetch transactions from exchange: ", Date.now() - time);
	//time = Date.now();
	var transactionsPojo: ITransaction[] = [];

	const transactions = await ccxtService.createTransactions(ccxtTransactions);
	//console.log("create transactions: ", Date.now() - time);
	//time = Date.now();
	for (let i = 0; i < transactions.length; i++) {
		exchangeAccountDocument.transactions.push(transactions[i]);
		transactionsPojo.push(transactions[i].toObject());
	}

	//console.log("push new transactions: ", Date.now() - time);
	//time = Date.now();

	return transactionsPojo;
}

async function updateOrders(exchange: Exchange, exchangeAccountDocument: IExchangeAccountDocument, balances: ccxt.Balances) {
	var closedOrders: IOrder[] = [];
	var ccxtOrders: ccxt.Order[] = [];
	const thingsToRemove = ['info', 'free', 'used', 'total'];

	if (!exchange.hasFetchOrders) {
		return [];
	}

	if (exchangeAccountDocument.exchangeType == 'binance' || exchangeAccountDocument.exchangeType == 'binanceus') {
		/*
		for (var [key, value] of Object.entries(balances)) {
			if (thingsToRemove.includes(key)) continue;
			if (value.total <= 0) continue;
			let orders = await exchange.fetchOrders(key, exchangeAccountDocument.lastSyncedDate.valueOf(), undefined, {}).catch((err) => {
				throw err;
			});
			ccxtOrders.concat(orders);
		}
		*/
	} else {
		ccxtOrders = await exchange.fetchOrders(undefined, exchangeAccountDocument.lastSyncedDate.valueOf(), undefined, {}).catch((err) => {
			throw err;
		});
	}

	const orders = await ccxtService.createOrders(ccxtOrders);

	for (var i = 0; i < orders.length; i++) {
		if (orders[i].status == 'open') {
			exchangeAccountDocument.openOrders.push(orders[i]);
		} else if (orders[i].status == 'closed') {
			exchangeAccountDocument.orders.push(orders[i]);
			closedOrders.push(orders[i].toObject());
		}
	}

	return closedOrders;
}

async function createPortfolioItems(
	balances: {
		symbol: string;
		balance: ccxt.Balance;
		holdingHistory: IHoldingSnapshot[];
	}[]
): Promise<IPortfolioItem[]> {
	const portfolioItems: IPortfolioItem[] = [];

	for (var i = 0; i < balances.length; i++) {
		var length = 0;
		var averageBuyPrice = 1;
		var averageSellPrice = 1;
		var amountSold = 0;
		var amountBought = 0;

		if (balances[i].holdingHistory) {
			length = balances[i].holdingHistory.length;
		}

		if (length > 0) {
			let last = balances[i].holdingHistory[length - 1];
			averageBuyPrice = last.totalValueInvested / last.totalAmountBought;
			averageSellPrice = last.totalValueReceived / last.totalAmountSold;
			amountSold = last.totalAmountSold;
			amountBought = last.totalAmountBought;
		}

		let logoUrl = await getLogo(balances[i].symbol);

		const item: IPortfolioItem = {
			asset: {
				assetId: balances[i].symbol,
				symbol: balances[i].symbol,
				name: balances[i].symbol,
				logoUrl,
			},
			balance: balances[i].balance,
			averageBuyPrice: { USD: averageBuyPrice },
			averageSellPrice: { USD: averageSellPrice },
			amountSold,
			amountBought,
			holdingHistory: balances[i].holdingHistory,
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

async function getAvailableExchanges() {
	return ccxtService.getAvailableExchanges();
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

	let metaportfolio = await createMetaportfolioData(portfolioData);
	//portfolioData = [metaportfolio, ...portfolioData];
	return metaportfolio;
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
	//console.log(Date.now());
	const lastSynced = new Date();
	//var lastItem = lastSynced;
	const exchangeAccountDocument = await exchangeService.getById(exchangeId);
	//console.log("Get exchange account document: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();
	if (!exchangeAccountDocument) {
		throw 'Exchange account not found';
	}

	const balances: ccxt.Balances = await fetchBalances(exchange);

	const transactions: ITransaction[] = await updateTransactions(exchange, exchangeAccountDocument);
	//console.log("Update transactions: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();
	const orders: IOrder[] = await updateOrders(exchange, exchangeAccountDocument, balances);
	//console.log("Update orders: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();
	const portfolioItems: IPortfolioItem[] = await updatePortfolioItems(exchange, exchangeAccountDocument, orders, transactions, balances);
	//console.log("Update portfolio items ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();

	const newOrdersCount = orders.length;
	const newTransactionsCount = transactions.length;
	await saveTransactionViewItems(exchange, exchangeAccountDocument, newOrdersCount, newTransactionsCount);
	//console.log("save transaction view items: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();
	await saveHoldingsTimeslices(exchange, exchangeAccountDocument);
	//console.log("save holdings timeslices: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();

	exchangeAccountDocument.lastSyncedDate = lastSynced;

	const savedExchangeAccount = await exchangeAccountDocument.save().catch((err) => {
		throw err;
	});
	//console.log("save exchange account document back to mongodb: ", Date.now() - lastItem.valueOf());
	//lastItem = new Date();

	const portfolioData = await createPortfolioData(exchange, exchangeAccountDocument);
	//console.log("Create portfoliodata: ", Date.now() - lastItem.valueOf());
	return portfolioData;
}

async function fetchBalances(exchange: ccxt.Exchange) {
	var balances: ccxt.Balances = { info: { used: 0, free: 0, total: 0 } };
	balances.info = {};
	if (!exchange.hasFetchBalance) {
		return balances;
	}

	balances = await exchange.fetchBalance().catch((err) => {
		throw err;
	});

	return balances;
}

async function saveHoldingsTimeslices(ccxtExchange: ccxt.Exchange, exchange: IExchangeAccountDocument) {
	let timeslices: ITimeslices = {};
	let allTimeHoldingSlices: IHoldingSlice[] = [];
	let prices: { [key: string]: { [key: number]: number } } = {};

	let now = Date.now();
	let endDate = now + (86400000 - (now % 86400000)); // start of tomorrow

	let earliestTime = endDate;

	for (let i = 0; i < exchange.portfolioItems.length; i++) {
		let item = exchange.portfolioItems[i];
		let asset = item.asset.symbol;
		let holdingHistory = item.holdingHistory;

		let holdingSlice = {
			asset: asset,
			amount: 0,
			price: 0,
			value: 0,
			snapshots: holdingHistory,
		};
		allTimeHoldingSlices.push(holdingSlice);
	}

	if (exchange.lastSyncedDate.valueOf() > 0) {
		// just pick up where we left off since we've synced before
		Object.entries(exchange.timeslices).forEach(([key, value]: [string, ITimeslice]) => {
			timeslices[value.start] = value;
			earliestTime = value.start;
		});
	} else {
		// this is the first time ever syncing
		for (let i = 0; i < allTimeHoldingSlices.length; i++) {
			let slice = allTimeHoldingSlices[i];

			if (slice.snapshots[0].timestamp < earliestTime) {
				earliestTime = slice.snapshots[0].timestamp;
			}
		}
	}

	const startDate = earliestTime - (earliestTime % 86400000);

	let currentSnapshot: number[] = [];
	let lastPrice: number[] = [];
	let lastAmount: number[] = [];
	for (let i = 0; i < allTimeHoldingSlices.length; i++) {
		currentSnapshot[i] = 0;
		lastPrice[i] = 0;
		lastAmount[i] = 0;
	}

	for (let day = startDate; day < endDate; day += 86400000) {
		let timeslice: ITimeslice = {
			start: day,
			holdings: {},
			value: 0,
		};

		for (let holding = 0; holding < allTimeHoldingSlices.length; holding++) {
			let slice = allTimeHoldingSlices[holding];
			let snapsInThisSlice: IHoldingSnapshot[] = [];

			for (let i = currentSnapshot[holding]; i < slice.snapshots.length; i++) {
				let snap = slice.snapshots[i];
				let snapDay = snap.timestamp - (snap.timestamp % 86400000);

				if (snapDay < day) {
					lastAmount[holding] = snap.totalAmountBought - snap.totalAmountSold;
					lastPrice[holding] = snap.price.USD;
					currentSnapshot[holding]++;
				} else if (snapDay == day) {
					snapsInThisSlice.push(snap);
					lastAmount[holding] = snap.totalAmountBought - snap.totalAmountSold;
					lastPrice[holding] = snap.price.USD;
					currentSnapshot[holding]++;
				} else {
					break;
				}
			}

			let historicalPrice = await getHistoricalData(slice.asset, day).catch((err) => -1);
			if (historicalPrice != -1) {
				lastPrice[holding] = historicalPrice;
			}

			let value = lastAmount[holding] * lastPrice[holding];

			let holdingSlice: IHoldingSlice = {
				asset: slice.asset,
				amount: lastAmount[holding],
				price: lastPrice[holding],
				value: value,
				snapshots: snapsInThisSlice,
			};

			timeslice.holdings[slice.asset] = holdingSlice;
			timeslice.value += value;
		}

		timeslices[day] = timeslice;
	}

	exchange.timeslices = timeslices;
}

async function createPortfolioData(exchange: ccxt.Exchange, exchangeAccount: IExchangeAccountDocument) {
	var exchangeAccountJson = exchangeAccount.toJSON();
	delete exchangeAccountJson.portfolioItems;

	var totalValue = 0;
	var totalProfit = 0;
	var totalInvested = 0;
	var totalDeposited = 0;

	const formattedPortfolioItems: IPortfolioItemView[] = await Promise.all(
		exchangeAccount.portfolioItems.map(async (item) => {
			let length = item.holdingHistory.length;

			const currentPrice = await getConversionRate(exchange, item.asset.symbol, 'USD');
			var currentValue = item.balance.total * currentPrice;

			var last = item.holdingHistory[length - 1];
			var profitAllTime = 0;
			var profitPercentageAllTime = 0;

			if (length > 0) {
				profitAllTime = last.totalValueReceived - last.totalValueInvested + currentValue;
				profitPercentageAllTime = (profitAllTime / last.totalValueInvested) * 100;
			}

			totalProfit += profitAllTime;
			totalValue += currentValue;
			totalInvested += last.totalValueInvested;
			totalDeposited += last.totalValueDeposited;

			//const profit24Hour = (amountSoldInTheLast24Hours * averageSellInTheLast24Hours) - (value24HoursAgo * howMuchIHad24HoursAgo) + currentValue
			const profit24Hour = randNum();
			return {
				asset: item.asset,
				amount: item.balance.total,
				value: { USD: currentValue },
				profitTotal: { all: profitAllTime, h24: profit24Hour },
				currentPrice: currentPrice,
				profitPercentage: {
					all: profitPercentageAllTime,
					h24: randNum(),
				},
			};
		})
	);

	const formattedOpenOrders: IOpenOrderItemView[] = await Promise.all(
		exchangeAccount.openOrders.map(async (item) => {
			const symbols = item.symbol.split('/');
			let logoUrl = await getLogo(symbols[0]);
			return {
				id: item.id,
				exchangeName: exchangeAccount.name,
				symbol: symbols[0],
				quoteSymbol: symbols[1],
				logoUrl,
				type: item.side,
				date: item.timestamp,
				amount: item.amount,
				quoteAmount: item.cost,
				price: item.price,
				value: item.cost,
				fee: item.fee,
			};
		})
	);

	let portfolioData: IPortfolioDataView = {
		...exchangeAccountJson,
		transactions: exchangeAccount.transactionViewItems,
		portfolioItems: formattedPortfolioItems,
		profitPercentage: (totalProfit / totalDeposited) * 100,
		portfolioTotal: { USD: totalValue },
		profitTotal: { USD: totalProfit },
		logoUrl: exchangeAccount.logoUrl,
		openOrders: formattedOpenOrders,
	};

	return portfolioData;
}

type PortfolioItemsDict = { [key: string]: { item: IPortfolioItemView; totalInvested: { all: number; h24: number } } };

async function createMetaportfolioData(portfolioData: IPortfolioDataView[]) {
	let portfolioItemsDict: PortfolioItemsDict = {};
	let transactions: ITransactionItemView[] = [];
	let openOrders: IOpenOrderItemView[] = [];
	let portfolioItems: IPortfolioItemView[] = [];
	let profitTotal = { USD: 0 };
	let totalInvested = 0;
	let profitPercentage = 0;
	let portfolioTotal = { USD: 0 };

	for (let i = 0; i < portfolioData.length; i++) {
		mergePortfolioItems(portfolioItemsDict, portfolioData[i].portfolioItems);
		transactions = transactions.concat(portfolioData[i].transactions);
		openOrders = openOrders.concat(portfolioData[i].openOrders);
	}

	for (let [assetId, entry] of Object.entries(portfolioItemsDict)) {
		entry.item.profitPercentage.all = (entry.item.profitTotal.all / entry.totalInvested.all) * 100;
		entry.item.profitPercentage.h24 = (entry.item.profitTotal.h24 / entry.totalInvested.h24) * 100;
		if (entry.item.amount > 0) {
			entry.item.currentPrice = entry.item.value.USD / entry.item.amount;
		}
		portfolioTotal.USD += entry.item.value.USD;
		profitTotal.USD += entry.item.profitTotal.all;
		totalInvested += entry.totalInvested.all;

		portfolioItems.push(entry.item);
	}

	profitPercentage = (profitTotal.USD / totalInvested) * 100;

	let metaportfolio: IPortfolioDataView = {
		name: 'All portfolios',
		id: 'ALL',
		nickname: 'Metaportfolio',
		addedDate: new Date(),
		apiInfo: {
			apiKey: '',
			apiSecret: '',
			passphrase: '',
		},
		transactions,
		portfolioItems,
		profitPercentage,
		portfolioTotal,
		profitTotal,
		openOrders,
	};

	return metaportfolio;
}

async function mergePortfolioItems(portfolioItemsDict: PortfolioItemsDict, portfolioItems: IPortfolioItemView[]) {
	for (let i = 0; i < portfolioItems.length; i++) {
		let item = portfolioItems[i];
		if (portfolioItemsDict[item.asset.assetId]) {
			let entry = portfolioItemsDict[item.asset.assetId];
			entry.item.amount += item.amount;
			entry.item.value.USD += item.value.USD;
			entry.item.profitTotal.all += item.profitTotal.all;
			entry.item.profitTotal.h24 += item.profitTotal.h24;
			entry.totalInvested.all += (item.profitTotal.all / item.profitPercentage.all) * 100;
			entry.totalInvested.h24 += (item.profitTotal.h24 / item.profitPercentage.h24) * 100;
		} else {
			let totalInvested = { all: (item.profitTotal.all / item.profitPercentage.all) * 100, h24: (item.profitTotal.h24 / item.profitPercentage.h24) * 100 };

			portfolioItemsDict[item.asset.assetId] = {
				item: {
					asset: item.asset,
					amount: item.amount,
					value: item.value,
					currentPrice: item.currentPrice,
					profitTotal: {
						all: item.profitTotal.all,
						h24: item.profitTotal.h24,
					},
					profitPercentage: {
						all: 0,
						h24: 0,
					},
				},
				totalInvested,
			};
		}
	}
}

async function getLogo(symbol: string) {
	symbol = symbol.toLowerCase();
	let coin = await coindataService.getCoinMarketData(symbol);

	if (coin) {
		return coin.image;
	} else {
		return `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`;
	}
}
