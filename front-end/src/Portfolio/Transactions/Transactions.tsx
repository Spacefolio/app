import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import {TransactionItem} from './TransactionItem/TransactionItem';
import {portfolioActions} from '../../_actions'

export const Transactions = () => {
  const dispatch = useDispatch();

  const transactionData: ITransactionItemView[] = useSelector(
    (state: any) => state.portfolio.transactionData
  );

  useEffect(() => {
    dispatch(portfolioActions.getTransactions())
  },[])

  return (
    <div style={{width: "100%"}}>
      <DataLabelsContainer>
        <DataLabelItemWrapper>Type-Date</DataLabelItemWrapper>
        <DataLabelItemWrapper></DataLabelItemWrapper>
        <DataLabelItemWrapper>Amount</DataLabelItemWrapper>
        <DataLabelItemWrapper>Price</DataLabelItemWrapper>
        <DataLabelItemWrapper>Value</DataLabelItemWrapper>
        <DataLabelItemWrapper>Exchange-Pair</DataLabelItemWrapper>
        <DataLabelItemWrapper>Fees</DataLabelItemWrapper>
      </DataLabelsContainer>
      {transactionData ? (
        transactionData.map((pItem: ITransactionItemView) => {
          return <TransactionItem transactionItem={pItem} />;
        })
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
