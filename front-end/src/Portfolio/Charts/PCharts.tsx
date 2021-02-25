import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { FlexCard } from "../../_components";
import { PortfolioLineChart } from "../../_components/Charts/TimeSeries/PortfolioLineChart";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";
import { RD } from "../../Application/ResponsiveDesign";
import { timeframe } from "../../../../types";
import { PortfolioPieChart } from "../../_components/Charts/Pie/PieChart";
import { time } from "console";

function CalculateMainChartSize() {
  if (window.innerWidth > parseInt(RD.breakpointmonitor)) {
    return 1000;
  } else if (window.innerWidth > parseInt(RD.breakpointlaptop)) {
    return 700;
  } else if (window.innerWidth > parseInt(RD.breakpointtablet)) {
    return 530;
  } else if (window.innerWidth > parseInt(RD.breakpointsmartphone)) {
    return 630;
  } else if (window.innerWidth < parseInt(RD.breakpointsmartphone)) {
    return window.innerWidth - 140;
  }
}

export const Charts = () => {
  const dispatch = useDispatch();

  const [PortfolioChartData, setPortfolioChartData] = useState([]);
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");
  const [chartWidth, setChartWidth] = useState(CalculateMainChartSize());

  useEffect(() => {
    // window.addEventListener("resize", () =>
    //   setTimeout(function () {
    //     setChartWidth(CalculateMainChartSize());
    //   }, 100)
    // );
    portfolioService
      .getPortfolioChartData(timeframe)
      .then((res) => {
        setPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, []);

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {timeFrameSelectors.map((item: timeframe) => {
          return (
            <div
              onClick={(e) => {
                setTimeframe(item);
              }}
              className={`
                center-my-children ${
                  item == timeframe ? "selected-field" : null
                }`}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardWrapper>
      <FlexCard
        styles={{ gridArea: "one" }}
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
      <FlexCard styles={{ gridArea: "two" }}>
        <PortfolioPieChart size={450} id="portfolio-pie-chart" />
      </FlexCard>
      <FlexCard styles={{ gridArea: "three" }}>
        <div>{"exchange allocation pie chart"}</div>
      </FlexCard>
    </DashboardWrapper>
  );
};
