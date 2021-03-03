import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import { COLORS } from "../../../GlobalStyles/ResponsiveDesign";
import {
  DataWrapper,
  DesktopWrapper,
  HoldingDesktopWrapper,
  MobileWrapper,
} from "../../../GlobalStyles/TabularStyles";
import { trimFields } from "../../../_helpers/PortfolioHelperFunctions";

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
      <TableCell>
        <img width={"50px"} src={asset.logoUrl} />
        <div>{asset.name}</div>
      </TableCell>
    );
  };

  const AmountSection = () => {
    return <TableCell align="right">{amount}</TableCell>;
  };

  const CurrentPriceSection = () => {
    return <TableCell align="right">${trimFields(currentPrice, "USD")}</TableCell>;
  };
  const ValueSection = () => {
    return <TableCell align="right">${trimFields(value.USD, 'USD')}</TableCell>;
  };
  const ProfitSection = () => {
    return (
      <TableCell align="right">
        <div style={{ color: portfolioValueItemStyler(profitTotal.all) }}>
          ${profitTotal.all.toFixed(2)}
        </div>
        <div style={{ color: portfolioValueItemStyler(profitPercentage.all) }}>
          {profitPercentage.all.toFixed(2)}%
        </div>
      </TableCell>
    );
  };

  return (
    <React.Fragment>
      <TableRow>
        {NameSection()}
        {AmountSection()}
        {CurrentPriceSection()}
        {ValueSection()}
        {ProfitSection()}
      </TableRow>
    </React.Fragment>
  );
};
