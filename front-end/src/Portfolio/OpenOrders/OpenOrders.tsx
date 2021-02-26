import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "../../_components";
import { IOpenOrderItemView, IPortfolioDataView, IRegisterRequest, ITransactionItemView } from "../../../../types";
import { portfolioActions } from "../../_actions";
import { OpenOrderItem } from "./OpenOrderItem/OpenOrderItem";
import { IRootState } from "../../_reducers";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const [sortAscending, setSortAscending] = useState(false);  

  return (
    <div>
      {filteredPortfolioData ? <Filter data={filteredPortfolioData.openOrders} sortAscending={sortAscending} lineItemType={'openOrder'}/> : "NEED LOAD"}
    </div>
  );
};
