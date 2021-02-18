import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { FlexCard } from "../../_components";
import { PortfolioLineChart } from "../../_components/Charts/PortfolioLineChart";
import useDimensions from "react-use-dimensions";
import { useDefaultedState } from "beautiful-react-hooks";
import { alertActions } from "../../_actions";
import { portfolioService } from "../../_services";

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

  return (
    <DashboardWrapper>
      <FlexCard
        gridName={"one"}
        children={
          <PortfolioLineChart
            data={metaPortfolioChartData}
            width={450}
            height={250}
            id={"PCardChart"}
          />
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
