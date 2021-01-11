import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.scss";
import { Chart } from "../Chart";
import { OrderBook } from "./TradeComponents";
import { OrderPanel } from "../OrderPanel";
import { userActions } from "../_actions";
import { MarketSelector } from "../MarketSelector";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.authentication.user);

  const getUsers = userActions.getAll;
  const deleteUser = userActions.delete;

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleDeleteUser = (id) => {
    return (e) => dispatch(deleteUser(id));
  };

  return (
      <div className="trade-window-grid-container">
        <MarketSelector />
        <OrderPanel />
        <Chart />
        <OrderBook />
      </div>
  );
};
