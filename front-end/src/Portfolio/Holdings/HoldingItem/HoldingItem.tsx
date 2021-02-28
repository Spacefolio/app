import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import { COLORS } from "../../../GlobalStyles/ResponsiveDesign";
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
    return num < 0 ? COLORS.errorBase : COLORS.accentBase;
  };

  const NameSection = () => {
    return (
      <DataWrapper style={{ flexDirection: "row", alignItems: "center" }}>
        <img width={"50px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </DataWrapper>
    );
  };

  const AmountSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">{amount}</div>
      </DataWrapper>
    );
  };

  const CurrentPriceSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">${currentPrice.toFixed(2)}</div>
      </DataWrapper>
    );
  };
  const ValueSection = () => {
    return (
      <DataWrapper>
        <div className="table-right-align">${value.USD.toFixed(2)}</div>
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
          ${profitTotal.all.toFixed(2)}
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
      <DesktopWrapper key={portfolioItem.id}>
        {NameSection()}
        {AmountSection()}
        {CurrentPriceSection()}
        {ValueSection()}
        {ProfitSection()}
      </DesktopWrapper>
      <MobileWrapper key={portfolioItem.id + "mobile"}>
        {NameSection()}
        {AmountSection()}
        {ProfitSection()}
      </MobileWrapper>
    </React.Fragment>
  );
};
