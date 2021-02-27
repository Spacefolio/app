import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardWrapper,
  TimeframeItem,
  TimeFrameSelectorContainer,
} from "./generalStyle";

import { PortfolioLineChart } from "../../_components/Charts/TimeSeries/PortfolioLineChart";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";
import { RD } from "../../GlobalStyles/ResponsiveDesign";
import { timeframe } from "../../../../types";
import { PortfolioPieChart } from "../../_components/Charts/Pie/PieChart";
import { time } from "console";
import { IRootState } from "../../_reducers";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import { FlexCard } from "../../GlobalStyles";

export const Charts = () => {
  const dispatch = useDispatch();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );
  function CalculateMainChartSize(width: number) {
    if (width >= parseInt(RD.breakpointmonitor)) {
      return 1000;
    } else if (
      width < parseInt(RD.breakpointmonitor) &&
      width >= parseInt(RD.breakpointlaptop)
    ) {
      return 700;
    } else if (
      width < parseInt(RD.breakpointlaptop) &&
      width >= parseInt(RD.breakpointtablet)
    ) {
      return 530;
    } else if (
      width < parseInt(RD.breakpointtablet) &&
      width >= parseInt(RD.breakpointsmartphone)
    ) {
      return 630;
    } else if (width < parseInt(RD.breakpointsmartphone)) {
      return width - 140;
    }
  }
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

  const TimeFrameSelector = () => {
    const timeFrameSelectors: timeframe[] = [
      "24H",
      "1W",
      "1M",
      "3M",
      "6M",
      "1Y",
      "ALL",
    ];
    return (
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
    );
  };

  return (
    <DashboardWrapper>
      <FlexCard
        style={{ gridArea: "one" }}
        children={
          <div>
            <PortfolioLineChart
              data={PortfolioChartData}
              width={chartWidth}
              xAxis={true}
              timeframe={timeframe}
              yAxis={true}
              height={chartWidth * 0.6}
              id={"PCardChart"}
            />
            {TimeFrameSelector()}
          </div>
        }
      />
      <FlexCard style={{ gridArea: "two" }}>
        <PortfolioPieChart size={300} id="portfolio-pie-chart" />
      </FlexCard>
      <FlexCard style={{ gridArea: "three" }}>
        {"exchange allocation pie chart"}
      </FlexCard>
    </DashboardWrapper>
  );
};
