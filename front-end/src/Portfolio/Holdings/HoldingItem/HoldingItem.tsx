import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import { COLORS } from "../../../GlobalStyles/ResponsiveDesign";
import {
  DataWrapper,
  DesktopWrapper,
  HoldingDesktopWrapper,
  MobileWrapper,
} from "../../../GlobalStyles/TabularStyles";

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
      <DataWrapper style={{ flexDirection: "row", alignItems: "center", gridArea: 'assetName'}}>
        <img width={"50px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </DataWrapper>
    );
  };

  const AmountSection = () => {
    return (
      <DataWrapper style={{gridArea: 'amount'}}>
        <div className="table-right-align">{amount}</div>
      </DataWrapper>
    );
  };

  const CurrentPriceSection = () => {
    return (
      <DataWrapper style={{gridArea: 'currentPrice'}}>
        <div className="table-right-align">${currentPrice.toFixed(2)}</div>
      </DataWrapper>
    );
  };
  const ValueSection = () => {
    return (
      <DataWrapper style={{gridArea: 'value'}}>
        <div className="table-right-align">${value.USD.toFixed(2)}</div>
      </DataWrapper>
    );
  };
  const ProfitSection = () => {
    return (
      <DataWrapper style={{gridArea: 'profit'}}>
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
      <HoldingDesktopWrapper key={portfolioItem.id}>
        {NameSection()}
        {AmountSection()}
        {CurrentPriceSection()}
        {ValueSection()}
        {ProfitSection()}
      </HoldingDesktopWrapper>
      <MobileWrapper key={portfolioItem.id + "mobile"}>
        {NameSection()}
        {AmountSection()}
        {ProfitSection()}
      </MobileWrapper>
    </React.Fragment>
  );
};
