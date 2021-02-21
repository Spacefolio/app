import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { portfolioActions } from "../../_actions";
import { useState } from "react";
import { ILabelObject, LabelSorter } from "./LabelSorter";
import { Filter, FlexCard } from "../../_components";


export const Transactions = () => {
  const dispatch = useDispatch();

  const transactionData: ITransactionItemView[] = useSelector(
    (state: any) => state.portfolio.transactionData
  );

  const [filterField, setFilterField] = useState("value");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(portfolioActions.getTransactions());
  }, []);

  const sortTransactions = (field: string, ascending: boolean) => {
    return transactionData.sort((a: any, b: any) =>
      ascending ? a[field] - b[field] : b[field] - a[field]
    );
  };

  const filterTransactions = () => {};

  return (
    <div>
      <div style={{display: 'grid', gap: '8px'}}>
        {transactionData ? (
          sortTransactions(filterField, sortAscending).map(
            (pItem: ITransactionItemView) => {
              return <FlexCard children={<TransactionItem transactionItem={pItem}/>}/>;
            }
          )
        ) : (
          <div>loading...</div>
        )}
      </div>
    </div>
  );
};
