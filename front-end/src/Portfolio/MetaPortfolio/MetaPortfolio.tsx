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
} from "./generalStyle";
import {
  Dropdown,
  FlexCard,
  IDropdownItem,
  SyncButton,
} from "../../_components";
import { PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";
import { RD } from "../../Application/ResponsiveDesign";

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

  function CalculateMainChartSize() {
    if (window.innerWidth > parseInt(RD.breakpointmonitor)) {
      return 300;
    } else if (window.innerWidth > parseInt(RD.breakpointlaptop)) {
      return 200;
    } else if (window.innerWidth > parseInt(RD.breakpointtablet)) {
      return 200;
    } else if (window.innerWidth > parseInt(RD.breakpointsmartphone)) {
      return 200;
    }
  }

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);
  const [timeframeDropdownVisible, setTimeframeDropdownVisible] = useState(
    false
  );
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");
  const [chartWidth, setChartWidth] = useState(CalculateMainChartSize());

  useEffect(() => {
    window.addEventListener("resize", () =>
      setChartWidth(CalculateMainChartSize())
    );
    portfolioService
      .getPortfolioChartData(timeframe)
      .then((res) => {
        setMetaPortfolioChartData(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch(alertActions.error(err));
      });
  }, []);

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
          <div>{timeframe}</div>

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
        height={chartWidth * 0.6}
        id={"MetaportfolioChart"}
      />
    </MetaPortfolioChartWrapper>
  );

  const SyncButtonSection = (
    <SyncAreaContainer>
      <SyncButtonContainer onClick={() => dispatch(portfolioActions.sync())}>
        <SyncButton isSyncing={isSyncing}></SyncButton>
        <div>Sync</div>
      </SyncButtonContainer>
    </SyncAreaContainer>
  );

  const PortfolioValueSection = (
    <PortfolioValueWrapper>
      <PortfolioValueContainer>
        <PortfolioValueItem style={{ fontSize: "1.5em" }}>
          {data ? "$" + data.portfolioTotal.USD : "loading..."}
        </PortfolioValueItem>
        <div
          onClick={() => dispatch(portfolioActions.refresh())}
          style={{ width: "30px" }}
        >
          <SyncButton isSyncing={isRefreshing} />
        </div>
        {TimeFrameSelector()}
      </PortfolioValueContainer>
      <PortfolioValueChangeContainer>
        <PortfolioValueItem>
          {data ? data.profitPercentage.USD + "%" : "loading..."}
        </PortfolioValueItem>
        <PortfolioValueItem>
          {data ? "$" + data.profitTotal.USD : "loading..."}
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
