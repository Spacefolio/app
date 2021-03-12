import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioCharts } from "./Styles";
import { alertActions } from "../../../_actions";
import { portfolioService } from "../../../_services";
import { timeframe } from "../../../../../types";
import { PortfolioPieChart } from "../../../_components/Charts/Pie/PieChart";
import { IRootState } from "../../../_reducers";
import { FlexCard, GrowFromZero } from "../../../_styles";
import { MetaPortfolio } from "../..";

export const Charts = () => {
  const dispatch = useDispatch();

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  const [PortfolioChartData, setPortfolioChartData] = useState([]);

  const [timeframe, setTimeframe] = useState<timeframe>("ALL");

  useEffect(() => {
    setPortfolioChartData([]);
    portfolioService
      .getPortfolioChartData(timeframe, filterId)
      .then((res) => {
        setPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, [timeframe, filterId]);

  return (
    <PortfolioCharts>
      <FlexCard style={{ gridArea: "one" }}>
        <MetaPortfolio />
      </FlexCard>
      <FlexCard style={{ gridArea: "two" }}>
        <PortfolioPieChart size={300} id="portfolio-pie-chart" />
      </FlexCard>

      <FlexCard style={{ gridArea: "three" }}>
        {"exchange allocation pie chart"}
      </FlexCard>
    </PortfolioCharts>
  );
};
