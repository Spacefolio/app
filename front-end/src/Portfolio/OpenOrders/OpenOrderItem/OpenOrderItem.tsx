import React from "react";
import { ITransactionItemView } from "../../../../../types";
import { IOpenOrderItemView } from "../../../../../types";
import {
  decideTransactionIcon,
  SellTransactionIcon,
} from "../../../_components";
import {
  DataWrapper,
  DesktopWrapper,
  FixedInline,
  LabelWrapper,
  MobileWrapper,
} from "../../TabularCardStyles";

interface TreansactionItemProps {
  openOrderItem: IOpenOrderItemView;
}

export const OpenOrderItem: React.FC<TreansactionItemProps> = ({
  openOrderItem,
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
  } = openOrderItem;

  const isTrade = () =>
    type == "withdrawal" || type == "deposit" ? false : true;

  const renameTradeType = () => {
    switch (type) {
      case "buy":
        return "Bought";
      case "sell":
        return "Sold";
      case "withdrawal":
        return "Withdrew";
      case "deposit":
        return "Deposited";
    }
  };

  const TypeSection = () => {
    return (
      <DataWrapper>
        <FixedInline>
          {decideTransactionIcon(type)}
          <FixedInline>
            <div>{renameTradeType()}</div>
            <div>{symbol}</div>
          </FixedInline>
        </FixedInline>
      </DataWrapper>
    );
  };

  const AmountSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align" style={{ fontSize: "1.15em" }}>
          {amount} {symbol}
        </div>
        {isTrade() ? (
          <div className="table-right-align" style={{ fontSize: ".7em" }}>
            {type == "buy" ? "With" : "For"} {quoteAmount} {quoteSymbol}
          </div>
        ) : null}
      </DataWrapper>
    );
  };

  const PriceSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">${price}</div>
      </DataWrapper>
    );
  };

  const ValueSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">${"In Development..."}</div>
      </DataWrapper>
    );
  };

  const ExchangeNameSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">{exchangeName} -</div>
        <div className="table-right-align">
          {symbol}/{quoteSymbol}
        </div>
      </DataWrapper>
    );
  };

  const FeeSection = () => {
    return (
      <DataWrapper>
        {fee ? (
          <>
            <div className="table-right-align">
              {fee.cost.toFixed(8)} {fee.currency}
            </div>
            {fee.rate ? (
              <div className="table-right-align">{fee.rate}%</div>
            ) : null}
          </>
        ) : (
          <div className="table-right-align">-</div>
        )}
      </DataWrapper>
    );
  };

  return (
    <React.Fragment>
      <DesktopWrapper>
        {TypeSection()}
        {AmountSection()}
        {PriceSection()}
        {ValueSection()}
        {ExchangeNameSection()}
        {FeeSection()}
      </DesktopWrapper>
      <MobileWrapper>
        {TypeSection()}
        {AmountSection()}
        {ValueSection()}
      </MobileWrapper>
    </React.Fragment>
  );
};
