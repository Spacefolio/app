import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { PortfolioLineChart } from "../_components";
import { alertActions } from "../_actions";
import { portfolioService } from "../_services";
import { FlexCard } from "../GlobalStyles";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);

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
      <FlexCard style={{ gridArea: "one" }}>
        <PortfolioLineChart
          data={metaPortfolioChartData}
          width={300}
          height={150}
          id={"dashboardSummaryChart"}
        />
      </FlexCard>
      <FlexCard style={{ gridArea: "two" }}>
        <div>{"My Exchanges card"}</div>
      </FlexCard>
      <FlexCard style={{ gridArea: "three" }}>
        <div>{"another one"}</div>
      </FlexCard>
      <FlexCard style={{ gridArea: "four" }}>
        <div>{"another one"}</div>
      </FlexCard>
      <FlexCard style={{ gridArea: "five" }}>
        <div>{"another one"}</div>
      </FlexCard>
    </DashboardWrapper>
  );
};
