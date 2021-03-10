import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { IPortfolioItem } from "../../../../back-end/src/portfolios/portfolio.model";
import { IPortfolioDataView } from "../../../../types";
import { theme } from "../../AlgonexStyles/Theme";
import { IRootState } from "../../_reducers";
import { PortfolioSummaryItem } from "./PortfolioSummary copy";
import { SummaryWrapper } from "./Styles";

export const PortfolioSummary = () => {
  const portfolioData = useSelector(
    (state: IRootState) => state.portfolio.PortfolioData
  );

  return (
    <ThemeProvider theme={theme}>
      <SummaryWrapper>
        {portfolioData.map((portfolio: IPortfolioDataView, index: number) => {
          return <PortfolioSummaryItem key={index} data={portfolio} />
        })}
      </SummaryWrapper>
    </ThemeProvider>
  );
};
