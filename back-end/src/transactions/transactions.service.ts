import { IUserDocument } from "../users/user.model";
import { userService } from "../users/user.service";
import { exchangeService } from "../exchanges/exchange.service";
import { createTransactionViewItems } from "./transactionView";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";

export const transactionService = {
  getTransactions,
  getAllTransactions
};

async function getTransactions(exchangeId: string)
{
  const exchange = await exchangeService.getById(exchangeId);
  return createTransactionViewItems(exchange);
}

async function getAllTransactions(userId: string)
{
  const user: IUserDocument = await userService.getById(userId);
  const exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(user.linkedExchanges[0]);

  return createTransactionViewItems(exchangeAccount);
}