import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HoldingsWrapper } from "./generalStyle";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { FlexCard } from "../../_components";
import { HoldingItem } from "./HoldingItem/HoldingItem";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../types";

export const Holdings = () => {
  const dispatch = useDispatch();

  const portfolioData: IPortfolioDataView = useSelector(
    (state: any) => state.portfolio.portfolioData[0]
  );

  return (
    <HoldingsWrapper>
      <DataLabelsContainer>
        <DataLabelItemWrapper>Name</DataLabelItemWrapper>
        <DataLabelItemWrapper>Amount</DataLabelItemWrapper>
        <DataLabelItemWrapper>Price</DataLabelItemWrapper>
        <DataLabelItemWrapper>Value</DataLabelItemWrapper>
        <DataLabelItemWrapper>P/L</DataLabelItemWrapper>
      </DataLabelsContainer>
      {portfolioData ? (
        portfolioData.portfolioItems.map((pItem: IPortfolioItemView) => {
          return <HoldingItem portfolioItem={pItem} />;
        })
      ) : (
        <div>loading...</div>
      )}
    </HoldingsWrapper>
  );
};
