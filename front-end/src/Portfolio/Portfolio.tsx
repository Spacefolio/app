import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioWrapper } from "./Styles";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from ".";
import { FlexCard, GrowFromZero, Scrollbox } from "../AlgonexStyles";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { useState } from "react";

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const [component, setComponent] = useState(<Charts />);

  const PortfolioTabs = (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={(e, val) => {
        setValue(val);
      }}
    >
      <Tab onClick={() => setComponent(<Charts />)} label="Charts"></Tab>

      <Tab onClick={() => setComponent(<Holdings />)} label="Holdings"></Tab>

      <Tab
        onClick={() => setComponent(<Transactions />)}
        label="Transactions"
      ></Tab>

      <Tab
        onClick={() => setComponent(<OpenOrders />)}
        label="Open Orders"
      ></Tab>
    </Tabs>
  );

  return (
    <PortfolioWrapper>
      <React.Fragment>
        {PortfolioTabs}
        {component}
      </React.Fragment>
    </PortfolioWrapper>
  );
};
