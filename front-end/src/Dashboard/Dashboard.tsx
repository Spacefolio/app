import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { FlexCard } from "../_components";
import { PortfolioLineChart } from "../_components";
import { alertActions } from "../_actions";
import { portfolioService } from "../_services";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([])

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
            width={300}
            height={150}
            id={"dashboardSummaryChart"}
          />
        }
      />
      <FlexCard gridName={"two"} children={<div>{"My Exchanges card"}</div>} />
      <FlexCard gridName={"three"} children={<div>{"another one"}</div>} />
      <FlexCard gridName={"four"} children={<div>{"another one"}</div>} />
      <FlexCard gridName={"five"} children={<div>{"another one"}</div>} />
    </DashboardWrapper>
  );
};
