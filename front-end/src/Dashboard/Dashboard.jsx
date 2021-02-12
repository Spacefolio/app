import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DashboardWrapper} from"./generalStyle";
import {FlexCard} from '../_components';


export const Dashboard = () => {
  const dispatch = useDispatch();

  return (
      <DashboardWrapper>
        <FlexCard gridName={"one"} children={<div>{"hi there number 1"}</div>} />
        <FlexCard gridName={"two"} children={<div>{"hi there number 2"}</div>} />
        <FlexCard gridName={"three"} children={<div>{"hi there number 3"}</div>} />
        <FlexCard gridName={"four"} children={<div>{"hi there number 4"}</div>} />
        <FlexCard gridName={"five"} children={<div>{"hi there number 5"}</div>} />
      </DashboardWrapper>
  );
};
