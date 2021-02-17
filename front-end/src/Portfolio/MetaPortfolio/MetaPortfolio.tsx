import React, { useEffect, useState } from "react";
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
import { FlexCard, SyncButton } from "../../_components";
import { PortfolioLineChart } from "./MetaPortfolioChart";
import { portfolioActions } from "../../_actions";
import { IPortfolioDataView } from "../../../../types";

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

  const portfolioValueItemStyler = (num: number) => {
    return num < 0
      ? { color: "var(--error-base)" }
      : { color: "var(--accent-base)" };
  };

  useEffect(() => {}, []);

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        <PortfolioValueContainer>
          <PortfolioValueItem style={{fontSize: "1.5em"}}>
            {data ? "$" + data.portfolioTotal : "loading..."}
          </PortfolioValueItem>
          <div
            onClick={() => dispatch(portfolioActions.refresh())}
            style={{ width: "30px" }}
          >
            <SyncButton isSyncing={isRefreshing} />
          </div>
        </PortfolioValueContainer>
        <PortfolioValueChangeContainer>
          <PortfolioValueItem
            style={
              data ? portfolioValueItemStyler(data.profitPercentage) : null
            }
          >
            {data ? data.profitPercentage + "%" : "loading..."}
          </PortfolioValueItem>
          <PortfolioValueItem
            style={data ? portfolioValueItemStyler(data.profitTotal) : null}
          >
            {data ? "$" + data.profitTotal : "loading..."}
          </PortfolioValueItem>
        </PortfolioValueChangeContainer>
      </PortfolioValueWrapper>

      <MetaPortfolioChartWrapper>
        <PortfolioLineChart
          width={200}
          height={100}
          id={"MetaportfolioChart"}
        />
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
