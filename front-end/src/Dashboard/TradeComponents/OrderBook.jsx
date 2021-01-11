import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderBook.scss";

export const OrderBook = () => {
  const dispatch = useDispatch();

  return (
    <div className="trade-panel-container order-book-container">
      <div>i'm an Order Book</div>
    </div>
  );
};
