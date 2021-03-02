import React from "react";
import { timeframe } from "../../../types";
import { RD } from "../GlobalStyles/ResponsiveDesign";
import {
  TimeFrameSelectorContainer,
  TimeframeItem,
} from "../Portfolio/Charts/PChartStyles";

export const trimFields = (value: number, currencyType: string) => {
  switch (currencyType) {
    case "BTC":
      return value.toFixed(8);
    case "USD":
      return value.toFixed(2);
    case "USDC":
      return value.toFixed(2);
    case "USDT":
      return value.toFixed(2);
    default:
      return value.toFixed(6);
  }
};

export function CalculateMainChartSize(width: number) {
  if (width >= parseInt(RD.breakpointmonitor)) {
    return [1200, 400];
  } else if (
    width < parseInt(RD.breakpointmonitor) &&
    width >= parseInt(RD.breakpointlaptop)
  ) {
    return [1000, 400];
  } else if (
    width < parseInt(RD.breakpointlaptop) &&
    width >= parseInt(RD.breakpointtablet)
  ) {
    return [800, 400];
  } else if (
    width < parseInt(RD.breakpointtablet) &&
    width >= parseInt(RD.breakpointsmartphone)
  ) {
    return [630, 400];
  } else if (width < parseInt(RD.breakpointsmartphone)) {
    return [(width - 100), 300];
  }
}
export const timeFrameSelectors: timeframe[] = [
  "24H",
  "1W",
  "1M",
  "3M",
  "6M",
  "1Y",
  "ALL",
];

export function CalculateMetaportfolioChartSize(width: number) {
  if (width >= parseInt(RD.breakpointmonitor)) {
    return 600;
  } else if (
    width < parseInt(RD.breakpointmonitor) &&
    width >= parseInt(RD.breakpointlaptop)
  ) {
    return 400;
  } else if (
    width < parseInt(RD.breakpointlaptop) &&
    width >= parseInt(RD.breakpointtablet)
  ) {
    return 300;
  } else if (
    width < parseInt(RD.breakpointtablet) &&
    width >= parseInt(RD.breakpointsmartphone)
  ) {
    return 250;
  } else if (width < parseInt(RD.breakpointsmartphone)) {
    return 200;
  }
}