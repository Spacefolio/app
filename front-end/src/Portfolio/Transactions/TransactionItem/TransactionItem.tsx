import React from "react";
import { ITransactionItemView } from "../../../../../types";
import {
  decideTransactionIcon,
  SellTransactionIcon,
} from "../../../_components";
import { trimFields } from "../../../_helpers/PortfolioHelperFunctions";
import { TabItem } from "../../portfolioStyles";
import {
  DataWrapper,
  DesktopWrapper,
  FixedInline,
  LabelWrapper,
  MobileWrapper,
  TransactionDesktopWrapper,
} from "../../../GlobalStyles/TabularStyles";
import { Avatar, TableRow, Typography } from "@material-ui/core";
import { FlexWrap, InlineDiv } from "../../../GlobalStyles";
import {
  TableCellStyled,
  TableRowStyled,
} from "../../PortfolioFilter/Filter/FilterStyles";
import { IRootState } from "../../../_reducers";
import { useSelector } from "react-redux";

interface ITransactionItemProps {
  item: ITransactionItemView;
}

export const TransactionItem: React.FC<ITransactionItemProps> = ({
  item: transactionItem,
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

  const dateString = new Date(date).toDateString();

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isTrade = () =>
    type == "withdrawal" || type == "deposit" ? false : true;

  const renameTradeType = () => {
    switch (type) {
      case "buy":
        return "Bought ";
      case "sell":
        return "Sold ";
      case "withdrawal":
        return "Withdrew ";
      case "deposit":
        return "Deposited ";
    }
  };

  const TypeSection = () => {
    return (
      <TableCellStyled>
        <InlineDiv>
          <Avatar>{decideTransactionIcon(type)}</Avatar> {symbol}
        </InlineDiv>
      </TableCellStyled>
    );
  };

  const AmountSection = () => {
    return (
      <TableCellStyled align="right">
        <FlexWrap align="flex-end">
          <Typography variant="button">{renameTradeType()}</Typography>
          <InlineDiv align="flex-end">
            {trimFields(amount, symbol)} {symbol}
          </InlineDiv>
        </FlexWrap>

        {isTrade() ? (
          <React.Fragment>
            <Typography variant="button">
              {type == "buy" ? "With" : "For "}
            </Typography>{" "}
            <InlineDiv align="flex-end">
              {trimFields(quoteAmount, quoteSymbol)} {quoteSymbol}
            </InlineDiv>
          </React.Fragment>
        ) : null}
      </TableCellStyled>
    );
  };

  const PriceSection = () => {
    return (
      <TableCellStyled align="right">
        ${trimFields(price, "USD")}
      </TableCellStyled>
    );
  };

  const ValueSection = () => {
    return (
      <TableCellStyled align="right">
        ${trimFields(value, "USD")}
      </TableCellStyled>
    );
  };

  const ExchangeNameSection = () => {
    return (
      <TableCellStyled align="right">
        <InlineDiv align="flex-end">{exchangeName}</InlineDiv>
        <InlineDiv align="flex-end">
          {" "}
          - {symbol}/{quoteSymbol}
        </InlineDiv>
      </TableCellStyled>
    );
  };

  const FeeSection = () => {
    return (
      <TableCellStyled align="right">
        {fee ? (
          <React.Fragment>
            {trimFields(fee.cost, fee.currency)} {fee.currency}
            {fee.rate ? <div>{fee.rate}%</div> : null}
          </React.Fragment>
        ) : (
          "-"
        )}
      </TableCellStyled>
    );
  };

  return (
    <React.Fragment>
      <TableRowStyled key={quoteAmount * value * amount - price}>
        {viewType == "mobile" ? (
          <React.Fragment>
            {TypeSection()}
            {AmountSection()}
            {PriceSection()}
            {ValueSection()}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {TypeSection()}
            {AmountSection()}
            {PriceSection()}
            {ValueSection()}
            {ExchangeNameSection()}
            {FeeSection()}
          </React.Fragment>
        )}
      </TableRowStyled>
    </React.Fragment>
  );
};
