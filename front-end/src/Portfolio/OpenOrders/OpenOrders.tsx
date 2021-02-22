import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { Filter, FlexCard, RenderLineItems } from "../../_components";
import { IOpenOrderItemView, ITransactionItemView } from "../../../../types";
import { alertActions, portfolioActions } from "../../_actions";
import { TransactionItem } from "../Transactions/TransactionItem/TransactionItem";
import { OpenOrderItem } from "./OpenOrderItem/OpenOrderItem";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const openOrders: IOpenOrderItemView[] = useSelector(
    (state: any) => state.portfolio.openOrdersData
  );

  const [filterField, setfilterField] = useState("date");
  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    dispatch(portfolioActions.getOpenOrders());
  }, []);

  const GetItemsAtDate = (transactions: any, date: string) => {
    return transactions[date].map((pItem: ITransactionItemView) => (
      <OpenOrderItem openOrderItem={pItem} />
    ));
  };

  return (
    <div>
      {openOrders ? (
        <>
          <Filter />
          <div style={{ display: "grid", gap: "8px" }}>
            {RenderLineItems(
              GetItemsAtDate,
              openOrders,
              sortAscending,
              filterField
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
