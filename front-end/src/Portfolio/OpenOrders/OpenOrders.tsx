import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import {
  Filter,
  FlexCard,
  RenderLineItems,
  SortLineItems,
} from "../../_components";
import { IOpenOrderItemView, ITransactionItemView } from "../../../../types";
import { portfolioActions } from "../../_actions";
import { TransactionItem } from "../Transactions/TransactionItem/TransactionItem";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const openOrders: IOpenOrderItemView[] = useSelector(
    (state: any) => state.portfolio.openOrdersData
  );

  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(portfolioActions.getOpenOrders());
  }, []);

  const GetItemsAtDate = (transactions: any, date: string) => {
    return transactions[date].map((pItem: ITransactionItemView) => (
      <TransactionItem transactionItem={pItem} />
    ));
  };

  return (
    <div>
      <Filter />
      <div style={{ display: "grid", gap: "8px" }}>
        {RenderLineItems(
          GetItemsAtDate,
          openOrders,
          sortAscending
        )}
      </div>
    </div>
  );
};
