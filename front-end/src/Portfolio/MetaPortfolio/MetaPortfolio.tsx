import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MetaPortfolioWrapper,
  PortfolioValueWrapper,
  MetaPortfolioChartWrapper,
} from "./generalStyle";
import { FlexCard, SyncButton } from "../../_components";
import { PortfolioLineChart } from "./MetaPortfolioChart";
import useDimensions from "react-use-dimensions";
import { portfolioActions } from "../../_actions";
import { IPortfolioData } from "../../../../types";

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const isSyncing = useSelector(
    (state: any) => state.portfolio.syncingPortfolio
  );
  const isRefreshing = useSelector(
    (state: any) => state.portfolio.recalculatingPortfolio
  );
  const data: IPortfolioData = useSelector(
    (state: any) => state.portfolio.portfolioData[0]
  );

  const portfolioValueItemStyler = (num: number) => {
    return num < 0
      ? { color: "var(--error-base)" }
      : { color: "var(--accent-base}" };
  };

  useEffect(() => {}, []);

  return (
    <MetaPortfolioWrapper>
      <PortfolioValueWrapper>
        {data ? (
          <React.Fragment>
            <div style={portfolioValueItemStyler(data.portfolioTotal)}>
              {data.portfolioTotal}
            </div>
            <div style={portfolioValueItemStyler(data.profitPercentage)}>
              {data.profitPercentage}
            </div>
            <div style={portfolioValueItemStyler(data.profitTotal)}>
              {data.profitTotal}
            </div>
          </React.Fragment>
        ) : (
          "loading..."
        )}
        <div
          onClick={() => dispatch(portfolioActions.refresh())}
          style={{ width: "40px" }}
        >
          Refresh
          <SyncButton isSyncing={isRefreshing} />
        </div>
      </PortfolioValueWrapper>

      <MetaPortfolioChartWrapper>
        <PortfolioLineChart
          width={200}
          height={100}
          id={"MetaportfolioChart"}
        />
      </MetaPortfolioChartWrapper>
      <div
        onClick={() => dispatch(portfolioActions.sync())}
        style={{ width: "40px" }}
      >
        Sync
        <SyncButton isSyncing={isSyncing} />
      </div>
    </MetaPortfolioWrapper>
  );
};
