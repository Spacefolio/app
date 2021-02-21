import React from "react";
import { ITransactionItemView } from "../../../../../types";
import {
  DataWrapper,
  DesktopWrapper,
  FixedInline,
  LabelWrapper,
  MobileWrapper,
} from "../../TabularCardStyles";

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

  const dateString = new Date(date).toDateString();

  const isTrade = () =>
    type == "withdrawal" || type == "deposit" ? false : true;

  return (
    <React.Fragment>
      <DesktopWrapper>
        <DataWrapper>
          <FixedInline>
            <img width={"30px"} src={logoUrl} />
            <div
              style={{
                fontSize: "1.1em",
                color: type == "buy" ? "var(--)" : "green",
              }}
            >
              {type.toUpperCase()}
            </div>
          </FixedInline>
        </DataWrapper>
        <DataWrapper>
          <div style={{ fontSize: "1.15em" }}>
            {amount} {symbol}
          </div>
          {isTrade() ? (
            <div style={{ fontSize: ".7em" }}>
              {type == "buy" ? "With" : "For"} {quoteAmount} {quoteSymbol}
            </div>
          ) : null}
        </DataWrapper>
        <DataWrapper>
          <FixedInline>${price}</FixedInline>
        </DataWrapper>
        <DataWrapper>
          <FixedInline>${value.toFixed(2)}</FixedInline>
        </DataWrapper>
        <DataWrapper>
          <div>{exchangeName} -</div>
          <div>
            {symbol}/{quoteSymbol}
          </div>
        </DataWrapper>
        <DataWrapper>
          {fee ? (
            <>
              <div>
                {fee.cost.toFixed(8)} {fee.currency}
              </div>
              {fee.rate ? <div>{fee.rate}%</div> : null}
            </>
          ) : (
            "-"
          )}
        </DataWrapper>
      </DesktopWrapper>
      <MobileWrapper>
        <DataWrapper>
          <FixedInline>
            <img width={"30px"} src={logoUrl} />
            <div
              style={{
                fontSize: "1.1em",
                color: type == "buy" ? "red" : "green",
              }}
            >
              {type.toUpperCase()}
            </div>
          </FixedInline>
        </DataWrapper>
        <DataWrapper>
          <div style={{ fontSize: "1.15em" }}>
            {amount} {symbol}
          </div>
          {isTrade() ? (
            <div style={{ fontSize: ".7em" }}>
              {type == "buy" ? "With" : "For"} {quoteAmount} {quoteSymbol}
            </div>
          ) : null}
        </DataWrapper>
        <DataWrapper>
          <FixedInline>${price}</FixedInline>
        </DataWrapper>
        <DataWrapper>{value.toFixed(2)}</DataWrapper>
      </MobileWrapper>
    </React.Fragment>
  );
};
