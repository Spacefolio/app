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

  const [sortField, setSortField] = useState("date");
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    dispatch(portfolioActions.getTransactions());
  }, []);

  const sortTransactions = (field: string, ascending: boolean) => {
    var dateItems: any = {};
    const sortedTransactions = transactionData
      .sort((a: any, b: any) =>
        ascending ? a[field] - b[field] : b[field] - a[field]
      )
      .map((transaction) => {
        let dateString = new Date(transaction.date).toDateString();
        if (dateItems[dateString] == undefined) {
          dateItems[dateString] = [];
        }
        dateItems[dateString].push(transaction);
      });
    console.log(dateItems);
    return dateItems;
  };

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
      <div style={{ display: "grid", gap: "8px" }}>{RenderLineItems(GetItemsAtDate, transactionData, sortAscending)}</div>
    </div>
  );
};
