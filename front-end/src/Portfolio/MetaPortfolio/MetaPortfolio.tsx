import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  MetaPortfolioChartWrapper,
  SyncAreaContainer,
  SyncButtonContainer,
  PortfolioValueChangeContainer,
  PortfolioValueContainer,
  PortfolioValueItem as PortfolioValueItem,
  MetaPortfolioTimeframeSelector,
} from "./generalStyle";
import {
  Dropdown,

  IDropdownItem,
  SyncIcon,
} from "../../_components";
import { PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";
import { RD } from "../../GlobalStyles/ResponsiveDesign";
import { IRootState } from "../../_reducers";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const isSyncing = useSelector(
    (state: any) => state.portfolio.syncingPortfolio
  );
  const isRefreshing = useSelector(
    (state: any) => state.portfolio.recalculatingPortfolio
  );
  const data: IPortfolioDataView = useSelector(
    (state: any) => state.portfolio.portfolioData[0]
  );

  const container = useRef();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  function CalculateMainChartSize() {
    if (applicationWidth >= parseInt(RD.breakpointmonitor)) {
      return 600;
    } else if (
      applicationWidth < parseInt(RD.breakpointmonitor) &&
      applicationWidth >= parseInt(RD.breakpointlaptop)
    ) {
      return 400;
    } else if (
      applicationWidth < parseInt(RD.breakpointlaptop) &&
      applicationWidth >= parseInt(RD.breakpointtablet)
    ) {
      return 300;
    } else if (
      applicationWidth < parseInt(RD.breakpointtablet) &&
      applicationWidth >= parseInt(RD.breakpointsmartphone)
    ) {
      return 250;
    } else if (applicationWidth < parseInt(RD.breakpointsmartphone)) {
      return 200;
    }
  }

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);
  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);
  const [timeframeDropdownVisible, setTimeframeDropdownVisible] = useState(
    false
  );
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");
  const [chartWidth, setChartWidth] = useState(CalculateMainChartSize());

  useEffect(() => {
    setChartWidth(CalculateMainChartSize());
  }, [applicationWidth]);

  useEffect(() => {
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

  const TimeFrameSelector = () => {
    const timeFrameSelectors: IDropdownItem[] = [
      { text: "24H" },
      { text: "1W" },
      { text: "1M" },
      { text: "3M" },
      { text: "6M" },
      { text: "1Y" },
      { text: "ALL" },
    ];
    return (
      <>
        <div
          onClick={() => setTimeframeDropdownVisible(!timeframeDropdownVisible)}
          ref={container}
          style={{ position: "relative" }}
        >
          <MetaPortfolioTimeframeSelector>
            {timeframe}
          </MetaPortfolioTimeframeSelector>

          {timeframeDropdownVisible ? (
            <Dropdown
              setVisiblity={setTimeframeDropdownVisible}
              isVisible={timeframeDropdownVisible}
              containerRef={container}
              dropdownItemList={timeFrameSelectors}
              defaultItemClickHandler={setTimeframe}
            />
          ) : null}
        </div>
      </>
    );
  };

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
    <SyncAreaContainer>
      <SyncButtonContainer onClick={() => dispatch(portfolioActions.sync())}>
        <SyncIcon isSyncing={isSyncing}></SyncIcon>
        <div>Sync</div>
      </SyncButtonContainer>
    </SyncAreaContainer>
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
        {TimeFrameSelector()}
      </PortfolioValueContainer>
      <PortfolioValueChangeContainer>
        <PortfolioValueItem>
          {data ? data.profitPercentage.USD.toFixed(2) + "%" : "loading..."}
        </PortfolioValueItem>
        <PortfolioValueItem>
          {data ? "$" + data.profitTotal.USD.toFixed(2) : "loading..."}
        </PortfolioValueItem>
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
