import React from "react";
import { IPortfolioData, IPortfolioItem } from "../../../../../types";
import { portfolioActions } from "../../../_actions";
import { HoldingItemWrapper, HoldingAttrWrapper } from "./generalStyle";

interface HoldingItemProps {
  portfolioItem: IPortfolioItem;
}

export const HoldingItem: React.FC<HoldingItemProps> = ({ portfolioItem }) => {
  const {
    asset,
    balance,
    profitTotal,
    currentPrice,
    profitPercentage,
  } = portfolioItem;

  return (
    <HoldingItemWrapper>
      <HoldingAttrWrapper>{asset.name}</HoldingAttrWrapper>
      <HoldingAttrWrapper>{balance}</HoldingAttrWrapper>
      <HoldingAttrWrapper>{currentPrice}</HoldingAttrWrapper>
      <HoldingAttrWrapper>{balance * currentPrice}</HoldingAttrWrapper>
      <HoldingAttrWrapper>
        {profitTotal.all}
        {profitPercentage.all}
      </HoldingAttrWrapper>
    </HoldingItemWrapper>
  );
};
