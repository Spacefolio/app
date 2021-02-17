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

  const portfolioValueItemStyler = (num: number) => {
    return num < 0 ? "var(--error-base)" : "var(--accent-base)";
  };

  return (
    <HoldingItemWrapper>
      <HoldingAttrWrapper>
        <img width={"30px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </HoldingAttrWrapper>
      <HoldingAttrWrapper>${balance}</HoldingAttrWrapper>
      <HoldingAttrWrapper>${currentPrice}</HoldingAttrWrapper>
      <HoldingAttrWrapper>${balance * currentPrice}</HoldingAttrWrapper>
      <HoldingAttrWrapper style={{ flexDirection: "column" }}>
        <div style={{ color: portfolioValueItemStyler(profitTotal.all) }}>
          ${profitTotal.all}
        </div>
        <div style={{ color: portfolioValueItemStyler(profitPercentage.all) }}>
          {profitPercentage.all}%
        </div>
      </HoldingAttrWrapper>
    </HoldingItemWrapper>
  );
};
