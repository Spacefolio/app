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
import { Dropdown, FlexCard, IDropdownItem, SyncButton } from "../../_components";
import { PortfolioLineChart } from "../../_components";
import { alertActions, portfolioActions } from "../../_actions";
import { IPortfolioDataView, timeframe } from "../../../../types";
import { portfolioService } from "../../_services";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const isSyncing = useSelector((state: any) => state.portfolio.syncingPortfolio);
  const isRefreshing = useSelector((state: any) => state.portfolio.recalculatingPortfolio);
  const data: IPortfolioDataView = useSelector((state: any) => state.portfolio.portfolioData[0]);

  const portfolioValueItemStyler = (num: number) => {
    return num < 0 ? { color: "var(--error-base)" } : { color: "var(--accent-base)" };
  };

  const container = useRef();

  const [metaPortfolioChartData, setMetaPortfolioChartData] = useState([]);
  const [timeframeDropdownVisible, setTimeframeDropdownVisible] = useState(false);
  const [timeframe, setTimeframe] = useState<timeframe>("ALL");

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
        <div onClick={() => setTimeframeDropdownVisible(!timeframeDropdownVisible)} ref={container}>
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

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        <PortfolioValueContainer>
          <PortfolioValueItem style={{ fontSize: "1.5em" }}>{data ? "$" + data.portfolioTotal.USD : "loading..."}</PortfolioValueItem>
          <div onClick={() => dispatch(portfolioActions.refresh())} style={{ width: "30px" }}>
            <SyncButton isSyncing={isRefreshing} />
          </div>
          {TimeFrameSelector()}
        </PortfolioValueContainer>
        <PortfolioValueChangeContainer>
          <PortfolioValueItem style={data ? portfolioValueItemStyler(data.profitPercentage.USD) : null}>
            {data ? data.profitPercentage.USD + "%" : "loading..."}
          </PortfolioValueItem>
          <PortfolioValueItem style={data ? portfolioValueItemStyler(data.profitTotal.USD) : null}>
            {data ? "$" + data.profitTotal.USD : "loading..."}
          </PortfolioValueItem>
        </PortfolioValueChangeContainer>
      </PortfolioValueWrapper>

      <MetaPortfolioChartWrapper>
        <PortfolioLineChart data={metaPortfolioChartData} width={200} timeframe={timeframe} height={100} id={"MetaportfolioChart"} />
      </MetaPortfolioChartWrapper>
      <SyncAreaContainer>
        <SyncButtonContainer onClick={() => dispatch(portfolioActions.sync())}>
          <SyncButton isSyncing={isSyncing}></SyncButton>
          <div>Sync</div>
        </SyncButtonContainer>
      </SyncAreaContainer>
    </MetaPortfolioWrapper>
  );
};
