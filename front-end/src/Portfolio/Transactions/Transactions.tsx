import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { portfolioActions } from "../../_actions";
import { useState } from "react";
import { ILabelObject, LabelSorter } from "./LabelSorter";
import { Filter, FlexCard, RenderLineItems } from "../../_components";

export const Transactions = () => {
  const dispatch = useDispatch();

  const transactionData: ITransactionItemView[] = useSelector(
    (state: any) => state.portfolio.transactionData
  );

  const [filterField, setfilterField] = useState("date");
  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    dispatch(portfolioActions.getTransactions());
  }, []);

  const GetItemsAtDate = (transactions: any, date: string) => {
    return transactions[date].map((pItem: ITransactionItemView) => (
      <TransactionItem transactionItem={pItem} />
    ));
  };

  // const filterTransactions = () => {
  //   const sortedShit = sortTransactions(sortField, sortAscending);
  //   if (transactionData) {
  //     return Object.keys(sortedShit).map((key) => {
  //       return (
  //         <>
  //           <div style={{ padding: "10px" }}>{key}</div>
  //           <FlexCard
  //             children={
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   width: "100%",
  //                   flexDirection: "column",
  //                   justifyContent: "space-evenly",
  //                 }}
  //               >
  //                 {getTransactionsAtDate(sortedShit, key)}
  //               </div>
  //             }
  //           />
  //         </>
  //       );
  //     });
  //   } else {
  //     return <div>loading...</div>;
  //   }
  // };

  return (
    <div>
      <Filter />
      {transactionData ? (
        <div style={{ display: "grid", gap: "8px" }}>
          {RenderLineItems(
            GetItemsAtDate,
            transactionData,
            sortAscending,
            filterField
          )}
        </div>
      ) : null}
    </div>
  );
};
