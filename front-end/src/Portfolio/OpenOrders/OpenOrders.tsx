import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "../../_components";
import { IOpenOrderItemView, ITransactionItemView } from "../../../../types";
import { portfolioActions } from "../../_actions";
import { OpenOrderItem } from "./OpenOrderItem/OpenOrderItem";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const openOrders: IOpenOrderItemView[] = useSelector(
    (state: any) => state.portfolio.openOrdersData
  );

  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    dispatch(portfolioActions.getOpenOrders());
  }, []);

  

  return (
    <div>
      {openOrders ? <Filter data={openOrders} sortAscending={sortAscending} lineItemType={'openOrder'}/> : "NEED LOAD"}
    </div>
  );
};
