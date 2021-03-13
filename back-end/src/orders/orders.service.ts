import { exchangeService } from "../exchanges/exchange.service";
import { createTransactionViewItemsForOpenOrders } from "../transactions";
import { IUserDocument, userService } from "../users";
import { ITransactionItemView } from "../../../types";
import { IExchangeAccountDocument } from "../exchanges/exchange.model";

export const orderService = {
  getOpenOrders,
  getAllOpenOrders,
};

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
