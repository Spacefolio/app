import React from "react";
import { ITransactionItemView } from "../../../../../types";
import {
  decideTransactionIcon,
} from "../../../_components";
import { ReformatCurrencyValue } from "../../../_helpers/formatters";
import { Avatar, TableRow, Typography } from "@material-ui/core";
import { FlexWrap, InlineDiv } from "../../../AlgonexStyles";
import {
  TableCellStyled,
  TableRowStyled,
} from "../../PortfolioFilter/Styles";
import useMedia from "use-media";
import { RD } from "../../../AlgonexStyles/ResponsiveDesign";

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

  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

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
          <Avatar>{decideTransactionIcon(type)}</Avatar>{" "}
          <Typography>{symbol}</Typography>
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
            <Typography>{ReformatCurrencyValue(amount, symbol)}</Typography>
            <Typography>{symbol}</Typography>
          </InlineDiv>
        </FlexWrap>

        {isTrade() ? (
          <React.Fragment>
            <Typography variant="button">
              {type == "buy" ? "With" : "For "}
            </Typography>
            <InlineDiv align="flex-end">
              <Typography>{ReformatCurrencyValue(quoteAmount, quoteSymbol)}</Typography>
              <Typography>{quoteSymbol}</Typography>
            </InlineDiv>
          </React.Fragment>
        ) : null}
      </TableCellStyled>
    );
  };

  const PriceSection = () => {
    return (
      <TableCellStyled align="right">
        <Typography>${ReformatCurrencyValue(price, "USD")}</Typography>
      </TableCellStyled>
    );
  };

  const ValueSection = () => {
    return (
      <TableCellStyled align="right">
        <Typography>${ReformatCurrencyValue(value, "USD")}</Typography>
      </TableCellStyled>
    );
  };

  const ExchangeNameSection = () => {
    return (
      <TableCellStyled align="right">
        <InlineDiv align="flex-end">
          <Typography>{exchangeName}</Typography>
        </InlineDiv>
        <InlineDiv align="flex-end">
          <Typography>
            {symbol}/{quoteSymbol}
          </Typography>
        </InlineDiv>
      </TableCellStyled>
    );
  };

  const FeeSection = () => {
    return (
      <TableCellStyled align="right">
        {fee ? (
          <React.Fragment>
            <Typography>{ReformatCurrencyValue(fee.cost, fee.currency)}</Typography>{" "}
            <Typography>{fee.currency}</Typography>
            {fee.rate ? <Typography>{fee.rate}%</Typography> : null}
          </React.Fragment>
        ) : (
          <Typography>{"-"}</Typography>
        )}
      </TableCellStyled>
    );
  };

  return (
    <React.Fragment>
      <TableRowStyled key={quoteAmount * value * amount - price}>
        {isMobile ? (
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
