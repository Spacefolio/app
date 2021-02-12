import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {DashboardWrapper} from"./generalStyle";
import {FlexCard} from '../../_components';


export const OpenOrders = () => {
  const dispatch = useDispatch();

  return (
      <DashboardWrapper>
        <FlexCard gridName={"one"} children={<div>{"All of my open orders and their information"}</div>} />
      </DashboardWrapper>
  );
};
