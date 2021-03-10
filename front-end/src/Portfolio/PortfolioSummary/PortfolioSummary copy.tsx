import react from "react";
import React from "react";
import { IPortfolioDataView } from "../../../../types";
import { FlexCard } from "../../AlgonexStyles";
import { Container } from "./Styles";

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

  return (
    <FlexCard>
      <Container>{name}{nickname}</Container>
    </FlexCard>
  );
};
