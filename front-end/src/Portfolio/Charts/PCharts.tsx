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

export const Charts = () => {
  const dispatch = useDispatch();

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");

  useEffect(() => {
    portfolioService
      .getPortfolioChartData(timeframe)
      .then((res) => {
        setMetaPortfolioChartData(res);
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
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {timeFrameSelectors.map((item) => {
          return (
            <div
              onClick={(e) => {
                setTimeframe(item);
              }}
              className="center-my-children"
              style={{
                width: "100%",
                padding: "10px",
                border: "solid 1px black",
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
        gridName={"one"}
        children={
          <div>
            <PortfolioLineChart
              data={metaPortfolioChartData}
              width={parseInt(RD.widthsmartphone)}
              xAxis={true}
              timeframe={timeframe}
              yAxis={true}
              height={parseInt(RD.widthsmartphone) * 0.6}
              id={"PCardChart"}
            />
            {TimeFrameSelector()}
          </div>
        }
      />
      <FlexCard
        gridName={"two"}
        children={<PortfolioPieChart width={450} height={450} id="portfolio-pie-chart"/>}
      />
      <FlexCard
        gridName={"three"}
        children={<div>{"exchange allocation pie chart"}</div>}
      />
    </DashboardWrapper>
  );
};
