import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DashboardWrapper} from"./generalStyle";
import {FlexCard} from '../../_components';
import {HoldingItem} from './HoldingItem'
import { IPortfolioData, IPortfolioItem } from "../../../../types";

export const Holdings = () => {
  const dispatch = useDispatch();

  const portfolioData: IPortfolioData = useSelector((state: any) => state.portfolio.portfolioData[0])

  return (
      <DashboardWrapper>
        {portfolioData? portfolioData.portfolioItems.map((pItem: IPortfolioItem) => {  
          return(<HoldingItem portfolioItem={pItem}/>)
        }): <div>loading...</div>}
        
      </DashboardWrapper>
  );
};
