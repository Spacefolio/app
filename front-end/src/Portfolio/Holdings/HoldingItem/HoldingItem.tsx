import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import { portfolioActions } from "../../../_actions";
import {
  TableLineItemWrapper,
  LineItemAttrWrapper,
} from "../../portfolioStyles";

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

  return (
    <TableLineItemWrapper>
      <LineItemAttrWrapper>
        <img width={"30px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </LineItemAttrWrapper>
      <LineItemAttrWrapper>${value.USD}</LineItemAttrWrapper>
      <LineItemAttrWrapper>${currentPrice}</LineItemAttrWrapper>
      <LineItemAttrWrapper>${value.USD * currentPrice}</LineItemAttrWrapper>
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
