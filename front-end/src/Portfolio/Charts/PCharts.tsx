import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardWrapper } from "./generalStyle";
import { FlexCard } from "../../_components";
import { PortfolioLineChart } from "./PortfolioLineChart";
import useDimensions from "react-use-dimensions";

export const Charts = () => {
  const dispatch = useDispatch();
  const [ref, refSize] = useDimensions();

  return (
    <DashboardWrapper>
      <FlexCard
        gridName={"one"}
        children={
          <PortfolioLineChart width={450} height={250} id={"PCardChart"}/>
        }
      />
      <FlexCard
        gridName={"two"}
        children={<div>{"asset allocation pie chart"}</div>}
      />
      <FlexCard
        gridName={"three"}
        children={<div>{"exchange allocation pie chart"}</div>}
      />
    </DashboardWrapper>
  );
};
