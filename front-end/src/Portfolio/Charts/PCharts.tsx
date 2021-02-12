import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DashboardWrapper} from"./generalStyle";
import {FlexCard} from '../../_components';


export const Charts = () => {
  const dispatch = useDispatch();

  return (
      <DashboardWrapper>
        <FlexCard gridName={"one"} children={<div>{"Portfolio perfomance line chart"}</div>} />
        <FlexCard gridName={"two"} children={<div>{"asset allocation pie chart"}</div>} />
        <FlexCard gridName={"three"} children={<div>{"exchange allocation pie chart"}</div>} />
      </DashboardWrapper>
  );
};
