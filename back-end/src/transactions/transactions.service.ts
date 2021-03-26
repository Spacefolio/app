import { IUserDocument } from '../users/user.model';
import { exchangeService } from '../exchanges/exchange.service';
import {
	createTransactionViewItems,
	createTransactionViewItemsForOpenOrders,
} from './transactionView';
import { IExchangeAccountDocument } from '../exchanges/exchange.model';
import { ITransactionItemView, IUser } from '../../../types';
import { exchanges } from 'ccxt';
import { create } from 'domain';
import { User } from '../users/user.service';

export const transactionService = {
	getTransactions,
	getAllTransactions,
	getOpenOrders,
	getAllOpenOrders,
};

async function getTransactions(userId: string, exchangeId: string) {
	const user: IUserDocument = await User.getById(userId);
	if (!user) throw 'User not found';
	if (user.linkedExchanges.includes(exchangeId))
		throw 'The specified exchange not found for this user';

	const exchange = await exchangeService.getById(exchangeId);
	return exchange.transactionViewItems;
}

async function getAllTransactions(userId: string) {
	const user: IUserDocument = await User.getById(userId);
	if (!user) throw 'User not found';
	var viewItems: ITransactionItemView[] = [];

	for (let i = 0; i < user.linkedExchanges.length; i++) {
		let exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(
			user.linkedExchanges[i]
		);
		viewItems.push(...exchangeAccount.transactionViewItems);
	}

	return viewItems;
}

async function getOpenOrders(userId: string, exchangeId: string) {
	const user: IUserDocument = await User.getById(userId);
	if (!user) throw 'User not found';
	if (!user.linkedExchanges.includes(exchangeId))
		throw 'The specified exchange not found for this user';

	const exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(
		exchangeId
	);

	return createTransactionViewItemsForOpenOrders(exchangeAccount);
}

async function getAllOpenOrders(userId: string) {
	const user: IUserDocument = await User.getById(userId);
	var exchangeAccount: IExchangeAccountDocument;
	if (!user) throw 'User not found';
	var viewItems: ITransactionItemView[] = [];

	for (let i = 0; i < user.linkedExchanges.length; i++) {
		let exchangeAccount = await exchangeService.getById(
			user.linkedExchanges[i]
		);
		let openOrders = await createTransactionViewItemsForOpenOrders(
			exchangeAccount
		);
		viewItems.push(...openOrders);
	}

	return viewItems;
}
