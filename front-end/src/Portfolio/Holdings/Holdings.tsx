import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {HoldingsWrapper, DataLabelsContainer} from"./generalStyle";
import {FlexCard} from '../../_components';
import {HoldingItem} from './HoldingItem/HoldingItem'
import { IPortfolioDataView, IPortfolioItem } from "../../../../types";

export const Holdings = () => {
  const dispatch = useDispatch();

  const portfolioData: IPortfolioDataView = useSelector((state: any) => state.portfolio.portfolioData[0])

  return (
      <HoldingsWrapper>
        <DataLabelsContainer>
          <div>Name</div>
          <div>Amount</div>
          <div>Price</div>
          <div>Value</div>
          <div>P/L</div>
          
        </DataLabelsContainer>
        {portfolioData? portfolioData.portfolioItems.map((pItem: IPortfolioItem) => {  
          return(<HoldingItem portfolioItem={pItem}/>)
        }): <div>loading...</div>}
        
      </HoldingsWrapper>
  );
};
