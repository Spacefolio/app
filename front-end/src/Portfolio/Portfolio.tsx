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
import { PortfolioWrapper, StyledTab, StyledTabs } from "./Styles";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from ".";
import {
  CustomFlexCard,
  FlexCard,
  GrowFromZero,
  Scrollbox,
} from "../AlgonexStyles";
import {
  Tabs,
  Tab,
  Paper,
  ThemeProvider,
  Card,
  makeStyles,
  Divider,
} from "@material-ui/core";
import { useState } from "react";
import { theme } from "../AlgonexStyles/Theme";

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const [component, setComponent] = useState(<Charts />);

  const PortfolioTabs = (
    <StyledTabs
      value={value}
      indicatorColor="primary"
      onChange={(e, val) => {
        setValue(val);
      }}
    >
      <StyledTab
        onClick={() => setComponent(<Charts />)}
        label="Charts"
      ></StyledTab>
      <Divider orientation="vertical" flexItem />
      <StyledTab
        onClick={() => setComponent(<Holdings />)}
        label="Holdings"
      ></StyledTab>
      <Divider orientation="vertical" flexItem />
      <StyledTab
        onClick={() => setComponent(<Transactions />)}
        label="Transactions"
      ></StyledTab>
      <Divider orientation="vertical" flexItem />
      <StyledTab
        onClick={() => setComponent(<OpenOrders />)}
        label="Open Orders"
      ></StyledTab>
    </StyledTabs>
  );

  return (
    <ThemeProvider theme={theme}>
      <PortfolioWrapper>
        <React.Fragment>
          {PortfolioTabs}
          {component}
        </React.Fragment>
      </PortfolioWrapper>
    </ThemeProvider>
  );
};
