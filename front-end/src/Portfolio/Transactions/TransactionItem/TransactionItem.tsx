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
    fee,
  } = transactionItem;

  const dateString = new Date(date*1000).toDateString();

  return (
    <TableLineItemWrapper>
      <LineItemAttrWrapper>
        <div style={{fontSize: '1.1em', color: type=='buy'? 'red': 'green'}}>{type.toUpperCase()}</div>
        <div>{dateString}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <img width={"30px"} src={logoUrl} />
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <div style={{fontSize: '1.15em'}}>{amount} {symbol}</div>
        <div style={{fontSize: '.7em'}}>{quoteAmount} {quoteSymbol}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>${price}</LineItemAttrWrapper>
      <LineItemAttrWrapper>${value}</LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <div>
          {symbol}/{quoteSymbol}
        </div>
        <div>{exchangeName}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>
        <div>{fee.cost}{fee.currency}</div>
        <div>{fee.rate}%</div>
      </LineItemAttrWrapper>
    </TableLineItemWrapper>
  );
};
