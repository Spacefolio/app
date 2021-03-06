import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  SyncButtonContainer,
  PortfolioName,
  PortfolioValueColumn,
  PortfolioProfitSection,
} from "./MetaportfolioStyles";
import { Dropdown, Modal, PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";
import { IRootState } from "../../_reducers";

import {
  CalculateMainChartSize,
  timeFrameSelectors,
} from "../../_helpers/PortfolioHelperFunctions";
import {
  ArrowDropDown,
  ArrowDropUp,
  DateRangeTwoTone,
} from "@material-ui/icons";
import { SvgWrapperButton, InlineDiv } from "../../GlobalStyles";
import {
  TimeFrameSelectorContainer,
  TimeframeItem,
} from "../Charts/PChartStyles";
import { SyncIcon } from "../../_components/Icons/IconStyles";
import { Avatar, Button, IconButton, Typography } from "@material-ui/core";
import { ListMyExchanges } from "../../Exchanges";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();

  const isSyncing = useSelector(
    (state: any) => state.portfolio.syncingPortfolio
  );

  const isRefreshing = useSelector(
    (state: any) => state.portfolio.recalculatingPortfolio
  );

  const filteredPortfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  const [PortfolioChartData, setPortfolioChartData] = useState([]);

  const [timeframe, setTimeframe] = useState<timeframe>("ALL");

  const [chartWidth, setChartWidth] = useState(
    CalculateMainChartSize(applicationWidth, viewType)
  );

  useEffect(() => {
    setChartWidth(CalculateMainChartSize(applicationWidth, viewType));
  }, [applicationWidth]);

  useEffect(() => {
    setPortfolioChartData([]);
    portfolioService
      .getPortfolioChartData(timeframe, filterId)
      .then((res) => {
        setPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, [timeframe, filterId]);

  const [chartDate, setChartDate] = useState(false);

  const [chartValue, setChartValue] = useState(false);

  const PortfolioValueSection = () => {
    const [portfolioSelectorVisible, setPortfolioSelectorVisible] = useState(
      false
    );

    const ref = useRef();

    const RefreshButton = (
      <SvgWrapperButton
        onClick={() => dispatch(portfolioActions.refresh(filterId, true))}
      >
        <SyncIcon isSyncing={isRefreshing} />
      </SvgWrapperButton>
    );

    const CurrentPortfolio = (
      <PortfolioName
        ref={ref}
        onClick={() => setPortfolioSelectorVisible(!portfolioSelectorVisible)}
      >
        <Button size="large" variant="outlined" color="primary">
          <InlineDiv>
            {filterId != "" ? filteredPortfolioData.nickname : "All Portfolios"}
            <ArrowDropDown />
          </InlineDiv>
        </Button>

        <Dropdown
          containerRef={ref}
          isVisible={portfolioSelectorVisible}
          setVisiblity={() => setPortfolioSelectorVisible(false)}
        >
          <ListMyExchanges enableEditing={false} />
        </Dropdown>
      </PortfolioName>
    );

    const SyncButtonSection = (
      <Button
        color="default"
        startIcon={<SyncIcon isSyncing={isSyncing} />}
        onClick={() => dispatch(portfolioActions.sync())}
      >
        Sync
      </Button>
    );

    const PortfolioValue = (
      <React.Fragment>
        {filteredPortfolioData != null ? (
          <InlineDiv>
            <Typography variant="h5">Portfolio Value: $</Typography>
            <div id={"PVID"}>
              {chartValue
                ? null
                : filteredPortfolioData.portfolioTotal.USD.toFixed(2)}
            </div>
          </InlineDiv>
        ) : (
          "loading..."
        )}
      </React.Fragment>
    );

    const PortfolioDate = (
      <Typography>
        {filteredPortfolioData != null ? (
          <div id={"PDID"}>{chartDate ? "" : ""}</div>
        ) : (
          "loading..."
        )}
      </Typography>
    );

    const ProfitPercentage = (
      <Typography>
        {filteredPortfolioData != null
          ? `(${filteredPortfolioData.profitPercentage.USD.toFixed(2)}%)`
          : "loading..."}
      </Typography>
    );

    const ProfitTotal = (
      <Typography>
        {filteredPortfolioData != null
          ? `$${filteredPortfolioData.profitTotal.USD.toFixed(2)}`
          : "loading..."}
      </Typography>
    );

    const ProfitDirection = (
      <Typography>
        {filteredPortfolioData != null ? (
          filteredPortfolioData.profitTotal.USD > 0 ? (
            <ArrowDropUp />
          ) : (
            <ArrowDropDown />
          )
        ) : (
          "loading..."
        )}
      </Typography>
    );

    return (
      <PortfolioValueWrapper>
        {/* <PortfolioValueColumn style={{ alignItems: "start" }}>
          {CurrentPortfolio}
          {SyncButtonSection}
        </PortfolioValueColumn> */}
        <PortfolioValueColumn>
          <Typography variant={"h4"}>
            <InlineDiv>
              {PortfolioValue}
              {PortfolioDate}
              {/* {RefreshButton} */}
            </InlineDiv>
          </Typography>
        </PortfolioValueColumn>
        <PortfolioValueColumn>
          <PortfolioProfitSection
            value={
              filteredPortfolioData && filteredPortfolioData.profitTotal.USD
            }
          >
            {ProfitDirection} {ProfitTotal} {ProfitPercentage}
          </PortfolioProfitSection>
        </PortfolioValueColumn>
      </PortfolioValueWrapper>
    );
  };

  const TimeframeSelectorBar = (
    <TimeFrameSelectorContainer>
      {timeFrameSelectors.map((item: timeframe) => {
        return (
          <TimeframeItem
            onClick={() => {
              setTimeframe(item);
            }}
            selected={item == timeframe}
          >
            {item}
          </TimeframeItem>
        );
      })}
    </TimeFrameSelectorContainer>
  );

  return (
    <MetaPortfolioWrapper>
      {PortfolioValueSection()}
      <div style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}>
        {TimeframeSelectorBar}
        <PortfolioLineChart
          setPV={setChartValue}
          setDate={setChartDate}
          data={PortfolioChartData}
          width={chartWidth && chartWidth[0]}
          xAxis={false}
          timeframe={timeframe}
          yAxis={false}
          height={chartWidth && chartWidth[1]}
          id={"PCardChart"}
        />
      </div>
    </MetaPortfolioWrapper>
  );
};
