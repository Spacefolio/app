import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { FlexCard } from "../../_components";
import { PortfolioLineChart } from "../../_components/Charts/PortfolioLineChart";
import useDimensions from "react-use-dimensions";
import { useDefaultedState } from "beautiful-react-hooks";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";
import { RD } from "../../Application/ResponsiveDesign";
import { timeframe } from "../../../../types";

export const Charts = () => {
  const dispatch = useDispatch();

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);

  useEffect(() => {
    portfolioService
      .getPortfolioChartData("all")
      .then((res) => {
        setMetaPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, []);

  const timeFrameSelectors = [
    { name: "24H"},
    { name: "1W" },
    { name: "1M" },
    { name: "3M" },
    { name: "6M" },
    { name: "1Y" },
    { name: "ALL" },
  ];

  const TimeFrameSelector = () => {
    return(
      <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
        {timeFrameSelectors.map((item) => {
          return <div className="center-my-children" style={{width: "100%", padding: "10px"}}>{item.name}</div>
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
              width={parseInt(RD.widthtablet)}
              xAxis={true}
              yAxis={true}
              height={500}
              id={"PCardChart"}
            />
            {TimeFrameSelector()}
          </div>
        }
      />
      <FlexCard
        gridName={"two"}
        children={<div>{"asset allocation pie chart"}</div>}
      />
      <FlexCard
        gridName={"three"}
        children={<div>{"exchange allocation pie chart"}</div>}
      />
    </DashboardWrapper>
  );
};
