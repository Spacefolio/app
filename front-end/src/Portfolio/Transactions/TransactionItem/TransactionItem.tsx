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
      <DataWrapper style={{gridArea: "typeSection"}}>
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
      <DataWrapper style={{gridArea: "amountSection"}}>
        <div className="table-right-align" style={{ fontSize: "1.15em" }}>
          {trimFields(amount, symbol)} {symbol}
        </div>
        {isTrade() ? (
          <div className="table-right-align" style={{ fontSize: ".7em" }}>
            {type == "buy" ? "With" : "For"} {trimFields(quoteAmount, quoteSymbol)} {quoteSymbol}
          </div>
        ) : null}
      </DataWrapper>
    );
  };

  const PriceSection = () => {
    return (
      <DataWrapper style={{gridArea: "priceSection"}}>
        <div className="table-right-align">${trimFields(price, "USD")}</div>
      </DataWrapper>
    );
  };

  const ValueSection = () => {
    return (
      <DataWrapper style={{gridArea: "valueSection"}}>
        <div className="table-right-align">${trimFields(value, "USD")}</div>
      </DataWrapper>
    );
  };

  const ExchangeNameSection = () => {
    return (
      <DataWrapper style={{gridArea: "exchangeNameSection"}}>
        <div className="table-right-align">{exchangeName} -</div>
        <div className="table-right-align">
          {symbol}/{quoteSymbol}
        </div>
      </DataWrapper>
    );
  };

  const FeeSection = () => {
    return (
      <DataWrapper style={{gridArea: "feeSection"}}>
        {fee ? (
          <>
            <div className="table-right-align">
              {trimFields(fee.cost, fee.currency)} {fee.currency}
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
      <TransactionDesktopWrapper>
        {TypeSection()}
        {AmountSection()}
        {PriceSection()}
        {ValueSection()}
        {ExchangeNameSection()}
        {FeeSection()}
      </TransactionDesktopWrapper>
      <MobileWrapper>
        {TypeSection()}
        {AmountSection()}
        {ValueSection()}
      </MobileWrapper>
    </React.Fragment>
  );
};
