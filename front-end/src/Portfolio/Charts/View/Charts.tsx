import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioCharts } from "./Styles";
import { alertActions } from "../../../_actions";
import { portfolioService } from "../../../_services";
import { ITimeframe } from "../../../../../types";
import { PortfolioPieChart } from "../../../_components/Charts/Pie/PieChart";
import { IRootState } from "../../../_reducers";
import { FlexCard, GrowFromZero } from "../../../_styles";
import { MetaPortfolio } from "../..";

export const Charts = () => {
  const dispatch = useDispatch();

  return (
    <PortfolioCharts>
      <FlexCard style={{ gridArea: "one" }}>
        <MetaPortfolio />
      </FlexCard>
      <FlexCard style={{ gridArea: "two" }}>
      </FlexCard>

      <FlexCard style={{ gridArea: "three" }}>
        {"exchange allocation pie chart"}
      </FlexCard>
    </PortfolioCharts>
  );
};
