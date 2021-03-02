import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardWrapper,
  TimeframeItem,
  TimeFrameSelectorContainer,
} from "./PChartStyles";

import { PortfolioLineChart } from "../../_components/Charts/TimeSeries/PortfolioLineChart";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";
import { RD } from "../../GlobalStyles/ResponsiveDesign";
import { timeframe } from "../../../../types";
import { PortfolioPieChart } from "../../_components/Charts/Pie/PieChart";
import { IRootState } from "../../_reducers";
import { FlexCard, GrowFromZero } from "../../GlobalStyles";
import {
  CalculateMainChartSize,
  timeFrameSelectors,
} from "../../_helpers/PortfolioHelperFunctions";

export const Charts = () => {
  const dispatch = useDispatch();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);
  const [PortfolioChartData, setPortfolioChartData] = useState([]);
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");
  const [chartWidth, setChartWidth] = useState(
    CalculateMainChartSize(applicationWidth)
  );

  useEffect(() => {
    setChartWidth(CalculateMainChartSize(applicationWidth));
  }, [applicationWidth]);

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
        <FlexCard style={{ gridArea: "one" }}>
          <div>
            <PortfolioLineChart
              data={PortfolioChartData}
              width={chartWidth[0]}
              xAxis={true}
              timeframe={timeframe}
              yAxis={true}
              height={chartWidth[1]}
              id={"PCardChart"}
            />
            <TimeFrameSelectorContainer>
              {timeFrameSelectors.map((item: timeframe) => {
                return (
                  <TimeframeItem
                    onClick={() => {
                      setTimeframe(item);
                    }}
                    selected={item == timeframe}
                  >
                    {item}
                  </TimeframeItem>
                );
              })}
            </TimeFrameSelectorContainer>
          </div>
        </FlexCard>
      </GrowFromZero>
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
