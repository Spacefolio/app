import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import {TransactionItem} from './TransactionItem/TransactionItem';
import {portfolioActions} from '../../_actions'

export const Transactions = () => {
  const dispatch = useDispatch();

  // const transactionData: ITransactionItemView[] = useSelector(
  //   (state: any) => state.portfolio.transactionData
  // );

  const transactionData = [{
      id: '91204387509123487q21093',
      exchangeName: "Coinbase Pro",
      symbol: 'XRP',
      quoteSymbol: 'USD',
      logoUrl: 'https://www.ebuyer.com/blog/wp-content/uploads/2013/11/bitcoin-logo-1000_0.jpg',
      type: "buy",
      date: 1613614331,
      amount: 26485,
      quoteAmount: 8965.25,
      price: 0.256,
      value: 8965.25,
      fee: { cost: 17.65, currency: 'USD', rate: 0.04 }
  }]

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
