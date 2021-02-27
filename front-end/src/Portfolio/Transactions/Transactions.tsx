import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { IPortfolioDataView, ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";

import { useState } from "react";

import { Filter } from "../../_components";

import { IRootState } from "../../_reducers";

export const Transactions = () => {
  const dispatch = useDispatch();

  const [sortAscending, setSortAscending] = useState(true);
  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  return (
    <div>
      {filteredPortfolioData ? (
        <Filter
          data={filteredPortfolioData.transactionViewItems}
          sortAscending={sortAscending}
          LineItemComponent={TransactionItem}
        />
      ) : (
        "NEED LOAD"
      )}
    </div>
  );
};
