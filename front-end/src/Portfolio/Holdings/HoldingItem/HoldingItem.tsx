import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import "../../Portfolio.scss";

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
    <tr>
      <td>
        <div style={{display: "flex"}}>
          <img width={"30px"} src={asset.logoUrl} />
          <div>{asset.name}</div>
        </div>
      </td>
      <td className="table-right-align">${amount}</td>
      <td className="table-right-align">${currentPrice}</td>
      <td className="table-right-align">${value.USD}</td>
      <td className="table-right-align">
        <div style={{ color: portfolioValueItemStyler(profitTotal.all) }}>
          ${profitTotal.all}
        </div>
        <div style={{ color: portfolioValueItemStyler(profitPercentage.all) }}>
          {profitPercentage.all}%
        </div>
      </td>
    </tr>
  );
};
