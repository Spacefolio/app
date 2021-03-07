import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardWrapper,
  TimeframeItem,
  TimeFrameSelectorContainer,
} from "./PChartStyles";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";
import { timeframe } from "../../../../types";
import { PortfolioPieChart } from "../../_components/Charts/Pie/PieChart";
import { IRootState } from "../../_reducers";
import { FlexCard, GrowFromZero } from "../../AlgonexStyles";

export const Charts = () => {
  const dispatch = useDispatch();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

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
    <DashboardWrapper>
      <GrowFromZero in={true}>
        <FlexCard style={{ gridArea: "two" }}>
          <PortfolioPieChart size={300} id="portfolio-pie-chart" />
        </FlexCard>
      </GrowFromZero>
      <GrowFromZero in={true}>
        <FlexCard style={{ gridArea: "three" }}>
          {"exchange allocation pie chart"}
        </FlexCard>
      </GrowFromZero>
    </DashboardWrapper>
  );
};
