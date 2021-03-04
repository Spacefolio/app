import { Avatar, TableCell, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../../types";
import { InlineDiv } from "../../../GlobalStyles";
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
        <InlineDiv>
          <Avatar src={asset.logoUrl} />
          <Typography>{asset.name}</Typography>
        </InlineDiv>
      </TableCell>
    );
  };

  const AmountSection = () => {
    return (
      <TableCell align="right">
        <Typography>{amount}</Typography>
      </TableCell>
    );
  };

  const CurrentPriceSection = () => {
    return (
      <TableCell align="right">
        <Typography>${trimFields(currentPrice, "USD")}</Typography>
      </TableCell>
    );
  };
  const ValueSection = () => {
    return (
      <TableCell align="right">
        <Typography>${trimFields(value.USD, "USD")}</Typography>
      </TableCell>
    );
  };
  const ProfitSection = () => {
    return (
      <TableCell align="right">
        <Typography
          style={{ color: portfolioValueItemStyler(profitTotal.all) }}
        >
          ${profitTotal.all.toFixed(2)}
        </Typography>
        <Typography
          style={{ color: portfolioValueItemStyler(profitPercentage.all) }}
        >
          {profitPercentage.all.toFixed(2)}%
        </Typography>
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
