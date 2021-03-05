import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IPortfolioDataView, ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";

import { useState } from "react";

import { Filter, ViewLoading } from "../../_components";

import { IRootState } from "../../_reducers";
import { CircularProgress, Grow, LinearProgress } from "@material-ui/core";

export const Transactions = () => {
  const dispatch = useDispatch();

  const [sortAscending, setSortAscending] = useState(false);
  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  return (
    <React.Fragment>
      {filteredPortfolioData != null ? (
        <Filter
          data={filteredPortfolioData.transactionViewItems}
          sortAscending={sortAscending}
          LineItemComponent={TransactionItem}
        />
      ) : (
        <ViewLoading />
      )}
    </React.Fragment>
  );
};
