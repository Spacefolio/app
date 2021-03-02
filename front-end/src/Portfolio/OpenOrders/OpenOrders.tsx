import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, ViewLoading } from "../../_components";
import { IPortfolioDataView } from "../../../../types";
import { OpenOrderItem } from "./OpenOrderItem/OpenOrderItem";
import { IRootState } from "../../_reducers";

export const OpenOrders = () => {
  const dispatch = useDispatch();

  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const [sortAscending, setSortAscending] = useState(false);

  return (
    <React.Fragment>
      {filteredPortfolioData ? (
        <Filter
          data={filteredPortfolioData.openOrders}
          sortAscending={sortAscending}
          LineItemComponent={OpenOrderItem}
        />
      ) : (
        <ViewLoading />
      )}
    </React.Fragment>
  );
};
