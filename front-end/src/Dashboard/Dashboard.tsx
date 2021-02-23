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
      .getPortfolioChartData("ALL")
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
        styles={{gridArea: "one"}}
        children={
          <PortfolioLineChart
            data={metaPortfolioChartData}
            width={300}
            height={150}
            id={"dashboardSummaryChart"}
          />
        }
      />
      <FlexCard styles={{gridArea: "two"}} children={<div>{"My Exchanges card"}</div>} />
      <FlexCard styles={{gridArea: "three"}} children={<div>{"another one"}</div>} />
      <FlexCard styles={{gridArea: "four"}} children={<div>{"another one"}</div>} />
      <FlexCard styles={{gridArea: "five"}} children={<div>{"another one"}</div>} />
    </DashboardWrapper>
  );
};
