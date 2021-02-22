import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { portfolioActions } from "../../_actions";
import { useState } from "react";
import { ILabelObject, LabelSorter } from "./LabelSorter";
import { Filter } from "../../_components";

export const Transactions = () => {
  const dispatch = useDispatch();

  const transactionData: ITransactionItemView[] = useSelector(
    (state: any) => state.portfolio.transactionData
  );

  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(portfolioActions.getTransactions());
  }, []);

  const GetItemsAtDate = (dateGroupedData: any, date: string) => {
    return dateGroupedData[date].map((item: ITransactionItemView) => (
      <TransactionItem transactionItem={item} />
    ));
  };

  return (
    <div>
      {transactionData ? <Filter data={transactionData} sortAscending={sortAscending} lineItemType={"transaction"}/> : "NEED LOAD"}
    </div>
  );
};
