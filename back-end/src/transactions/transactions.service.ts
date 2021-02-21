import { IUserDocument } from "../users/user.model";
import { userService } from "../users/user.service";
import { exchangeService } from "../exchanges/exchange.service";
import {
  createTransactionViewItems,
  createTransactionViewItemsForOpenOrders,
} from "./transactionView";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import { ITransactionItemView, IUser } from "../../../types";
import { exchanges } from "ccxt";

export const transactionService = {
  getTransactions,
  getAllTransactions,
  getOpenOrders,
  getAllOpenOrders,
};

async function getTransactions(userId: string, exchangeId: string) {
  const user: IUserDocument = await userService.getById(userId);
  if (!user) throw "User not found";
  if (user.linkedExchanges.includes(exchangeId))
    throw "The specified exchange not found for this user";

  const exchange = await exchangeService.getById(exchangeId);
  return createTransactionViewItems(exchange);
}

async function getAllTransactions(userId: string) {
  const user: IUserDocument = await userService.getById(userId);
  if (!user) throw "User not found";
  const exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(
    user.linkedExchanges[0]
  );

  return createTransactionViewItems(exchangeAccount);
}

async function getOpenOrders(userId: string, exchangeId: string) {
  const user: IUserDocument = await userService.getById(userId);
  if (!user) throw "User not found";
  if (!user.linkedExchanges.includes(exchangeId))
    throw "The specified exchange not found for this user";

  const exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(
    exchangeId
  );
  return createTransactionViewItemsForOpenOrders(exchangeAccount);
}

async function getAllOpenOrders(userId: string) {
  const user: IUserDocument = await userService.getById(userId);
  var exchangeAccount: IExchangeAccountDocument;
  if (!user) throw "User not found";

  var viewItems: ITransactionItemView[] = [];

  for (let i = 0; i < user.linkedExchanges.length; i++) {
    exchangeAccount = await exchangeService.getById(user.linkedExchanges[i]);
    viewItems.push(...await createTransactionViewItemsForOpenOrders(exchangeAccount));
  }

  return viewItems;
}
