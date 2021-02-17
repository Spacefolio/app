import React from "react";
import { IPortfolioDataView, IPortfolioItem } from "../../../../../types";
import { portfolioActions } from "../../../_actions";
import { TableLineItemWrapper, LineItemAttrWrapper } from "../../portfolioStyles";

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
    <TableLineItemWrapper>
      <LineItemAttrWrapper>
        <img width={"30px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>${balance}</LineItemAttrWrapper>
      <LineItemAttrWrapper>${currentPrice}</LineItemAttrWrapper>
      <LineItemAttrWrapper>${balance * currentPrice}</LineItemAttrWrapper>
      <LineItemAttrWrapper style={{ flexDirection: "column" }}>
        <div style={{ color: portfolioValueItemStyler(profitTotal.all) }}>
          ${profitTotal.all}
        </div>
        <div style={{ color: portfolioValueItemStyler(profitPercentage.all) }}>
          {profitPercentage.all}%
        </div>
      </LineItemAttrWrapper>
    </TableLineItemWrapper>
  );
};
