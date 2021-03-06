import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./DashboardStyles";
import { PortfolioLineChart } from "../_components";
import { alertActions } from "../_actions";
import { portfolioService } from "../_services";
import { FlexCard } from "../GlobalStyles";
import { AddNewExchangeList } from "../Exchanges";
import { Typography } from "@material-ui/core";
import { IRootState } from "../_reducers";
import { CalculateMainChartSize } from "../_helpers/PortfolioHelperFunctions";
import { MetaPortfolio } from "../Portfolio";

export const Dashboard = () => {
  const dispatch = useDispatch();

  // const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);

  // const applicationWidth = useSelector(
  //   (state: IRootState) => state.applicationView.applicationContainerWidth
  // );

  // const viewType = useSelector(
  //   (state: IRootState) => state.applicationView.currentViewType
  // );

  // const [size, setSize] = useState([]);

  // useEffect(() => {
  //   portfolioService
  //     .getPortfolioChartData("ALL")
  //     .then((res) => {
  //       setMetaPortfolioChartData(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       dispatch(alertActions.error(err));
  //     });
  // }, []);

  // useEffect(() => {
  //   setSize(CalculateMainChartSize(applicationWidth, viewType));
  // }, [applicationWidth]);

  return (
    <DashboardWrapper>
      <FlexCard style={{ gridArea: "one", flexDirection: "column" }}>
        {/* <Typography variant={"h4"}>Portfolio</Typography> */}
        {/* <PortfolioLineChart
          data={metaPortfolioChartData}
          width={size[0]}
          height={size[1]}
          id={"dashboardSummaryChart"}
        /> */}
        <MetaPortfolio />
      </FlexCard>
      <FlexCard style={{ gridArea: "two", flexDirection: "column" }}>
        {/* <Typography variant={"h4"}>Add Integrations</Typography> */}
        <AddNewExchangeList />
      </FlexCard>
      <FlexCard style={{ gridArea: "three", flexDirection: "column" }}>
        {/* <Typography variant={"h4"}></Typography> */}
      </FlexCard>
      <FlexCard style={{ gridArea: "four", flexDirection: "column" }}>
        {/* <Typography variant={"h4"}></Typography> */}
      </FlexCard>
      <FlexCard style={{ gridArea: "five", flexDirection: "column" }}>
        {/* <Typography variant={"h4"}></Typography> */}
      </FlexCard>
    </DashboardWrapper>
  );
};
