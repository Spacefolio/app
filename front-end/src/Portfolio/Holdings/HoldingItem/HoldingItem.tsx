import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import "../../Portfolio.scss";
import {
  DataWrapper,
  DesktopWrapper,
  MobileWrapper,
} from "../../TabularCardStyles";

interface HoldingItemProps {
  portfolioItem: IPortfolioItemView;
}

export const HoldingItem: React.FC<HoldingItemProps> = ({ portfolioItem }) => {
  const {
    asset,
    amount,
    value,
    profitTotal,
    currentPrice,
    profitPercentage,
  } = portfolioItem;

  const portfolioValueItemStyler = (num: number) => {
    return num < 0 ? "var(--error-base)" : "var(--accent-base)";
  };

  const NameSection = () => {
    return (
      <DataWrapper style={{flexDirection: "row", alignItems: 'center'}}>
        <img width={"50px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </DataWrapper>
    );
  };

  const AmountSection = () => {
    return (
      <DataWrapper>
        <td className="table-right-align">${amount}</td>
      </DataWrapper>
    );
  };

  const CurrentPriceSection = () => {
    return (
      <DataWrapper>
        <td className="table-right-align">${currentPrice}</td>
      </DataWrapper>
    );
  };
  const ValueSection = () => {
    return (
      <DataWrapper>
        <td className="table-right-align">${value.USD}</td>
      </DataWrapper>
    );
  };
  const ProfitSection = () => {
    return (
      <DataWrapper>
        <div
          className="table-right-align"
          style={{ color: portfolioValueItemStyler(profitTotal.all) }}
        >
          ${profitTotal.all}
        </div>
        <div
          className="table-right-align"
          style={{ color: portfolioValueItemStyler(profitPercentage.all) }}
        >
          {profitPercentage.all}%
        </div>
      </DataWrapper>
    );
  };

  return (
    <React.Fragment>
      <DesktopWrapper>
        {NameSection()}
        {AmountSection()}
        {CurrentPriceSection()}
        {ValueSection()}
        {ProfitSection()}
      </DesktopWrapper>
      <MobileWrapper>
        {NameSection()}
        {AmountSection()}
        {ProfitSection()}
      </MobileWrapper>
    </React.Fragment>
  );
};
