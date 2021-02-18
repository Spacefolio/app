import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import {TransactionItem} from './TransactionItem/TransactionItem';

export const Transactions = () => {
  const dispatch = useDispatch();

  const transactionData: ITransactionItemView[] = useSelector(
    (state: any) => state.portfolio.
  );

  return (
    <DashboardWrapper>
      <DataLabelsContainer>
        <div>Type-Date</div>
        <div></div>
        <div>Amount</div>
        <div>Price</div>
        <div>Value</div>
        <div>Exchange-Pair</div>
        <div>Fees</div>
      </DataLabelsContainer>
      {transactionData ? (
        transactionData.map((pItem: ITransactionItemView) => {
          return <TransactionItem transactionItem={pItem} />;
        })
      ) : (
        <div>loading...</div>
      )}
    </DashboardWrapper>
  );
};
