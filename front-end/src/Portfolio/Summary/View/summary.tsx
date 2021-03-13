import { Fab, Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { IPortfolioItem } from "../../../../../back-end/src/portfolios/portfolio.model";
import { IPortfolioDataView } from "../../../../../types";
import { BaseButton } from "../../../_styles";
import { theme } from "../../../_styles/Theme";
import { IRootState } from "../../../_reducers";
import { PortfolioSummaryItem } from "./portfolio-item";
import { SummaryWrapper } from "./styles";

export const PortfolioSummary = () => {
  const portfolioData = useSelector(
    (state: IRootState) => state.portfolio.PortfolioData
  );

  return (
    <ThemeProvider theme={theme}>
      <SummaryWrapper>
        <div>
          <Fab color="primary">
            <Add />
          </Fab>
        </div>
        {portfolioData.map((portfolio: IPortfolioDataView, index: number) => {
          return <PortfolioSummaryItem key={index} data={portfolio} />;
        })}
      </SummaryWrapper>
      {/* <Fab
        style={{ position: "fixed", bottom: "1rem", right: "1rem" }}
        color="primary"
        aria-label="add"
      >
        <Add />
      </Fab> */}
    </ThemeProvider>
  );
};
