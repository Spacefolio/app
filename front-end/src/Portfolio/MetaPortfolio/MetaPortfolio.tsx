import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  PortfolioName,
  PortfolioValueColumn,
  PortfolioProfitSection,
  TimeframeItem,
  TimeFrameSelectorContainer,
} from "./Styles";
import { Dropdown, Modal, PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";
import { IRootState } from "../../_reducers";
import useDimensions from "react-use-dimensions";
import { timeFrameSelectors } from "../../_helpers/formatters";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
import { ListMyExchanges } from "../../Exchanges";
import { InlineDiv } from "../../AlgonexStyles";

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

  const [chartContainerRef, { width: chartContainerWidth }] = useDimensions();

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  const [PortfolioChartData, setPortfolioChartData] = useState<[]>([]);

  const [timeframe, setTimeframe] = useState<timeframe>("ALL");

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

    const ref: MutableRefObject<undefined> = useRef();

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

    const PortfolioValue = (
      <React.Fragment>
        {filteredPortfolioData != null ? (
          <InlineDiv>
            <Typography variant="h5">$</Typography>
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
      <React.Fragment>
        {filteredPortfolioData != null ? (
          <div id={"PDID"}>{chartDate ? "" : ""}</div>
        ) : (
          "loading..."
        )}
      </React.Fragment>
    );

    const ProfitPercentage = (
      <React.Fragment>
        {filteredPortfolioData != null
          ? `(${filteredPortfolioData.profitPercentage.USD.toFixed(2)}%)`
          : "loading..."}
      </React.Fragment>
    );

    const ProfitTotal = (
      <React.Fragment>
        {filteredPortfolioData != null
          ? `$${filteredPortfolioData.profitTotal.USD.toFixed(2)}`
          : "loading..."}
      </React.Fragment>
    );

    const ProfitDirection = (
      <React.Fragment>
        {filteredPortfolioData != null ? (
          filteredPortfolioData.profitTotal.USD > 0 ? (
            <ArrowDropUp />
          ) : (
            <ArrowDropDown />
          )
        ) : (
          "loading..."
        )}
      </React.Fragment>
    );

    return (
      <PortfolioValueWrapper>
        {/* <PortfolioValueColumn style={{ alignItems: "start" }}>
          {CurrentPortfolio}
          {SyncButtonSection}
        </PortfolioValueColumn> */}
        <PortfolioValueColumn>
          <InlineDiv>
            <Typography variant={"h4"}>
              {PortfolioValue}
              {PortfolioDate}
              {/* {RefreshButton} */}
            </Typography>
          </InlineDiv>
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
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        {TimeframeSelectorBar}
        <PortfolioLineChart
          setPV={setChartValue}
          setDate={setChartDate}
          data={PortfolioChartData}
          width={chartContainerWidth}
          xAxis={true}
          timeframe={timeframe}
          yAxis={false}
          height={400}
          id={"PCardChart"}
        />
      </div>
    </MetaPortfolioWrapper>
  );
};
