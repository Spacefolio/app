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
import moment from "moment";
import AnimatedNumber from "animated-number-react";

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

  const [portfolioDate, setPortfolioDate] = useState(null);

  const [portfolioValue, setPortfolioValue] = useState(null);

  const PortfolioValueSection = () => {
    const [portfolioSelectorVisible, setPortfolioSelectorVisible] = useState(
      false
    );

    const ref = useRef();

    const RefreshButton = (
      <SvgWrapperButton onClick={() => dispatch(portfolioActions.refresh())}>
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
            {filterId != "" ? data.nickname : "All Portfolios"}
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
        {data ? (
          <AnimatedNumber
            duration={200}
            delay={300}
            easing={"linear"}
            value={portfolioValue ? portfolioValue : data.portfolioTotal.USD}
            formatValue={(value: number) => `$${value.toFixed(2)}`}
          />
        ) : (
          "loading..."
        )}
      </React.Fragment>
    );

    const PortfolioDate = (
      <Typography>
        {data ? (portfolioDate ? portfolioDate : null) : "loading..."}
      </Typography>
    );

    const ProfitPercentage = (
      <Typography>
        {data ? `(${data.profitPercentage.USD.toFixed(2)}%)` : "loading..."}
      </Typography>
    );

    const ProfitTotal = (
      <Typography>
        {data ? `$${data.profitTotal.USD.toFixed(2)}` : "loading..."}
      </Typography>
    );

    const ProfitDirection = (
      <Typography>
        {data ? (
          data.profitTotal.USD > 0 ? (
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
      <PortfolioValueWrapper style={{ width: `${chartWidth}px` }}>
        <PortfolioValueColumn style={{ alignItems: "start" }}>
          {CurrentPortfolio}
          {SyncButtonSection}
        </PortfolioValueColumn>
        <PortfolioValueColumn>
          <Typography variant={"h4"}>
            <InlineDiv>
              {PortfolioValue}
              {RefreshButton}
            </InlineDiv>
          </Typography>
          <PortfolioProfitSection value={data && data.profitTotal.USD}>
            {ProfitDirection} {ProfitTotal} {ProfitPercentage}
          </PortfolioProfitSection>
          {PortfolioDate}
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
      <div>
        <PortfolioLineChart
          setPV={setPortfolioValue}
          setDate={setPortfolioDate}
          data={PortfolioChartData}
          width={chartWidth && chartWidth[0]}
          xAxis={false}
          timeframe={timeframe}
          yAxis={false}
          height={chartWidth && chartWidth[1]}
          id={"PCardChart"}
        />
        {TimeframeSelectorBar}
      </div>
    </MetaPortfolioWrapper>
  );
};
