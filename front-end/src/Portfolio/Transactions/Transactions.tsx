import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { IPortfolioDataView, ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { portfolioActions } from "../../_actions";
import { useState } from "react";
import { ILabelObject, LabelSorter } from "./LabelSorter";
import { Filter } from "../../_components";
import { userService } from "../../_services";
import { IRootState } from "../../_reducers";

export const Transactions = () => {
  const dispatch = useDispatch();

  const [sortAscending, setSortAscending] = useState(true);
  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) =>
      state.portfolio.filteredPortfolioData
  );

  const GetItemsAtDate = (dateGroupedData: any, date: string) => {
    return dateGroupedData[date].map((item: ITransactionItemView) => (
      <TransactionItem transactionItem={item} />
    ));
  };

  return (
    <div>
      {filteredPortfolioData ? (
        <Filter
          data={filteredPortfolioData.transactionViewItems}
          sortAscending={sortAscending}
          lineItemType={"transaction"}
        />
      ) : (
        "NEED LOAD"
      )}
    </div>
  );
};
