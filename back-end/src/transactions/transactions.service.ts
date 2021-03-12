import { IUserDocument } from "../users/user.model";
import { userService } from "../users/user.service";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";
import { ITransactionItemView, IUser } from "../../../types";
import { exchangeService } from "../exchanges";

export const transactionService = {
  getTransactions,
  getAllTransactions,
};

async function getTransactions(userId: string, exchangeId: string) {
  const user: IUserDocument = await userService.getById(userId);
  if (!user) throw "User not found";
  if (user.linkedExchanges.includes(exchangeId))
    throw "The specified exchange not found for this user";

  const exchange = await exchangeService.getById(exchangeId);
  return exchange.transactionViewItems;
}

async function getAllTransactions(userId: string) {
  const user: IUserDocument = await userService.getById(userId);
  if (!user) throw "User not found";
  var viewItems: ITransactionItemView[] = [];

  for (let i = 0; i < user.linkedExchanges.length; i++) {
    let exchangeAccount: IExchangeAccountDocument = await exchangeService.getById(
      user.linkedExchanges[i]
    );
    viewItems.push(...exchangeAccount.transactionViewItems);
  }

  return viewItems;
}
