import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DashboardWrapper} from"./generalStyle";
import {FlexCard} from '../_components';
import { PortfolioLineChart } from "../Portfolio/MetaPortfolio/MetaPortfolioChart";


export const Dashboard = () => {
  const dispatch = useDispatch();

  return (
      <DashboardWrapper>
        <FlexCard gridName={"one"} children={<PortfolioLineChart width={300} height={150} id={'dashboardSummaryChart'} />} />
        <FlexCard gridName={"two"} children={<div>{"My Exchanges card"}</div>} />
        <FlexCard gridName={"three"} children={<div>{"another one"}</div>} />
        <FlexCard gridName={"four"} children={<div>{"another one"}</div>} />
        <FlexCard gridName={"five"} children={<div>{"another one"}</div>} />
      </DashboardWrapper>
  );
};
