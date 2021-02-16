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

export const MetaPortfolio = () => {
  const dispatch = useDispatch();
  const isSyncing = useSelector(
    (state: any) => state.portfolio.syncingPortfolio
  );
  const isRefreshing = useSelector(
    (state: any) => state.portfolio.recalculatingPortfolio
  );
  const data = useSelector((state: any) => state.portfolio.portfolioData);

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
            <div style={portfolioValueItemStyler(data.PValue)}>
              {data.PValue}
            </div>
            <div style={portfolioValueItemStyler(data.PLValue)}>
              {data.PLValue}
            </div>
            <div style={portfolioValueItemStyler(data.PLPercent)}>
              {data.PLPercent}
            </div>
          </React.Fragment>
        ) : (
          "Placeholder"
        )}
        <div
          onClick={() => dispatch(portfolioActions.sync(false))}
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
        onClick={() => dispatch(portfolioActions.sync(true))}
        style={{ width: "40px" }}
      >
        Sync
        <SyncButton isSyncing={isSyncing} />
      </div>
    </MetaPortfolioWrapper>
  );
};
