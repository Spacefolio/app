import React from 'react'
import { IPortfolioData, IPortfolioItem } from '../../../../types';

interface HoldingItemProps {
  portfolioItem: IPortfolioItem
}

export const HoldingItem: React.FC<HoldingItemProps> = ({portfolioItem}) => {
    return (<div style={{width: "100%", height: "100%"}}>
      {portfolioItem.asset.name}  profit:{portfolioItem.profitTotal.all}
    </div>);
}