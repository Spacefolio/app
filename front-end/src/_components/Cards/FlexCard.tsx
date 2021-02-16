import React from 'react';
import { CardWrapper } from "./generalStyle";

interface FlexCardProps {
  gridName?: string;
  children: any;
}

export const FlexCard: React.FC<FlexCardProps> = ({ children, gridName}) => {
    return (
    <CardWrapper style={gridName?{gridArea: gridName}:null}>
      {children}
    </CardWrapper>
    );
}