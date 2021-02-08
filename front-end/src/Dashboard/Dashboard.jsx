import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import { Chart } from "../Chart";
import { OrderBook } from "./TradeComponents";
import { OrderPanel } from "../OrderPanel";
import { MarketSelector } from "../MarketSelector";

export const Dashboard = () => {
  const dispatch = useDispatch();

  return (
      <div className="trade-window-grid-container">
        <MarketSelector />
        <OrderPanel />
        <Chart />
        <OrderBook />
      </div>
  );
};
