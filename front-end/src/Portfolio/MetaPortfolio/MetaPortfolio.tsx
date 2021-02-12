import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MetaPortfolioWrapper,PortfolioValueWrapper } from "./generalStyle";
import { FlexCard } from "../../_components";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        <div>Total Profit/Loss</div>
        <div>Profit/Loss %</div>
        <div>Current Portfolio Value</div>
      </PortfolioValueWrapper>
      <div>Portfolio Chart</div>
    </MetaPortfolioWrapper>
  );
};
