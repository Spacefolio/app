import React from "react";
import {
  IPortfolioDataView,
  IPortfolioItemView,
  ITransactionItemView,
} from "../../../../../types";
import { portfolioActions } from "../../../_actions";
import {
  TableLineItemWrapper,
  LineItemAttrWrapper,
} from "../../portfolioStyles";

interface TreansactionItemProps {
  transactionItem: ITransactionItemView;
}

export const TransactionItem: React.FC<TreansactionItemProps> = ({
  transactionItem,
}) => {
  const portfolioValueItemStyler = (num: number) => {
    return num < 0 ? "var(--error-base)" : "var(--accent-base)";
  };

  const {
    type,
    quoteSymbol,
    exchangeName,
    symbol,
    logoUrl,
    quoteAmount,
    date,
    amount,
    value,
    price,
  } = transactionItem;

  return (
    <TableLineItemWrapper>
      <LineItemAttrWrapper>
        <div>{type}</div>
        <div>{date}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <img width={"30px"} src={logoUrl} />
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <div>{amount}</div>
        <div>{symbol}</div>
        <div>{quoteAmount}</div>
        <div>{quoteSymbol}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>{price}</LineItemAttrWrapper>
      <LineItemAttrWrapper>{value}</LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <div>
          {symbol}/{quoteSymbol}
        </div>
        <div>{exchangeName}</div>
      </LineItemAttrWrapper>
    </TableLineItemWrapper>
  );
};
