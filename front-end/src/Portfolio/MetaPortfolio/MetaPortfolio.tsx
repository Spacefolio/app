import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  MetaPortfolioChartWrapper,
  SyncButtonContainer,
  PortfolioValueChangeContainer,
  PortfolioValueContainer,
  PortfolioValueItem as PortfolioValueItem,
  MetaPortfolioTimeframeSelector,
} from "./MetaportfolioStyles";
import { Dropdown, IDropdownItem, SyncIcon } from "../../_components";
import { PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";
import { IRootState } from "../../_reducers";
import { Skeleton } from "@material-ui/lab";
import {
  CalculateMetaportfolioChartSize,
  timeFrameSelectors,
} from "../../_helpers/PortfolioHelperFunctions";
import { ArrowDropDown } from "@material-ui/icons";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const isSyncing = useSelector(
    (state: any) => state.portfolio.syncingPortfolio
  );
  const isRefreshing = useSelector(
    (state: any) => state.portfolio.recalculatingPortfolio
  );
  const data: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const container = useRef();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);
  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);
  const [timeframeDropdownVisible, setTimeframeDropdownVisible] = useState(
    false
  );
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");
  const [chartWidth, setChartWidth] = useState(
    CalculateMetaportfolioChartSize(applicationWidth)
  );

  useEffect(() => {
    setChartWidth(CalculateMetaportfolioChartSize(applicationWidth));
  }, [applicationWidth]);

  useEffect(() => {
    setMetaPortfolioChartData([]);
    portfolioService
      .getPortfolioChartData(timeframe)
      .then((res) => {
        setMetaPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, [timeframe, filterId]);

  const MetaportfolioChart = (
    <MetaPortfolioChartWrapper>
      <PortfolioLineChart
        data={metaPortfolioChartData}
        width={chartWidth}
        timeframe={timeframe}
        height={chartWidth * 0.3}
        id={"MetaportfolioChart"}
      />
    </MetaPortfolioChartWrapper>
  );

  const SyncButtonSection = (
    <SyncButtonContainer onClick={() => dispatch(portfolioActions.sync())}>
      <SyncIcon isSyncing={isSyncing}></SyncIcon>
      Sync
    </SyncButtonContainer>
  );

  const PortfolioValueSection = (
    <PortfolioValueWrapper>
      <PortfolioValueContainer>
        <PortfolioValueItem style={{ fontSize: "1.5em" }}>
          {data ? "$" + data.portfolioTotal.USD.toFixed(2) : "loading..."}
        </PortfolioValueItem>
        <div
          onClick={() => dispatch(portfolioActions.refresh())}
          style={{ width: "30px" }}
        >
          <SyncIcon isSyncing={isRefreshing} />
        </div>
        <div
          onClick={() => setTimeframeDropdownVisible(!timeframeDropdownVisible)}
          ref={container}
          style={{ position: "relative" }}
        >
          <MetaPortfolioTimeframeSelector>
            <div>{timeframe}</div>
            <ArrowDropDown />
          </MetaPortfolioTimeframeSelector>
        </div>
      </PortfolioValueContainer>
      <PortfolioValueChangeContainer>
        <PortfolioValueItem>
          {data ? data.profitPercentage.USD.toFixed(2) + "%" : "loading..."}
        </PortfolioValueItem>
        {data ? (
          <PortfolioValueItem>
            {"$" + data.profitTotal.USD.toFixed(2)}
          </PortfolioValueItem>
        ) : (
          <Skeleton variant="text" />
        )}
      </PortfolioValueChangeContainer>
    </PortfolioValueWrapper>
  );

  return (
    <MetaPortfolioWrapper>
      {PortfolioValueSection}
      {MetaportfolioChart}
      {SyncButtonSection}
    </MetaPortfolioWrapper>
  );
};
