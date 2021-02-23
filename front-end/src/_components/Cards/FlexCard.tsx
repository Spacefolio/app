import React from 'react';
import { CardWrapper } from "./generalStyle";

interface FlexCardProps {
  children: any;
  styles?: object;
}

export const FlexCard: React.FC<FlexCardProps> = ({ children, styles}) => {
    return (
    <CardWrapper style={styles}>
      {children}
    </CardWrapper>
    );
}