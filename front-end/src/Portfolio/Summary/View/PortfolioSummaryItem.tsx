import react, { useEffect, useState } from "react";
import React from "react";
import { IPortfolioDataView } from "../../../../../types";
import { BaseButton, FlexCard, InlineDiv } from "../../../AlgonexStyles";
import { PortfolioLineChart } from "../../../_components";
import { Container } from "./Styles";
import useDimensions from "react-use-dimensions";
import { alertActions } from "../../../_actions";
import { portfolioService } from "../../../_services";
import { useDispatch } from "react-redux";
import { Avatar, Typography } from "@material-ui/core";
import { Holdings } from "../..";
import { applicationViewActions } from "../../../_actions/applicationView.actions";
import { AddTransactionForm } from "../../Transactions/Add/Form";

interface IPortfolioSummaryItemView {
  data: IPortfolioDataView;
}

export const PortfolioSummaryItem: react.FC<IPortfolioSummaryItemView> = ({
  data,
}) => {
  const {
    name,
    id,
    nickname,
    addedDate,
    exchangeType,
    logoUrl,
    portfolioItems,
    profitPercentage,
    profitTotal,
    portfolioTotal,
  } = data;

  const dispatch = useDispatch();

  const [chartData, setChartData] = useState([]);

  const [chartContainerRef, { width }] = useDimensions();

  useEffect(() => {
    setChartData([]);
    portfolioService
      .getPortfolioChartData("ALL", id)
      .then((res) => {
        setChartData(res);
      })
      .catch((err) => {
        dispatch(alertActions.error(err));
      });
  }, []);

  return (
    <FlexCard>
      <Container>
        <BaseButton
          onClick={() =>
            dispatch(
              applicationViewActions.setModal(
                true,
                <AddTransactionForm />,
                "Add Transaction"
              )
            )
          }
        >Add Transaction</BaseButton>
        <InlineDiv style={{ gridArea: "name" }}>
          <Avatar src={logoUrl} />
          <Typography>{nickname}</Typography>
        </InlineDiv>

        <div
          style={{ gridArea: "chart", overflowX: "hidden" }}
          ref={chartContainerRef}
        >
          <PortfolioLineChart
            id={"test"}
            timeframe={"ALL"}
            data={chartData}
            width={width}
            yAxis={false}
            xAxis={true}
            height={200}
          />
        </div>
        <Holdings portfolioItems={portfolioItems} />
      </Container>
    </FlexCard>
  );
};
