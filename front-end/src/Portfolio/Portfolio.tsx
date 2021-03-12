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
  ScrollBox,
} from "../_styles";
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
import { theme } from "../_styles/Theme";
import { ListMyExchanges } from "../integrations";
import { PortfolioSummary } from "./Summary";

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);

  const history = useHistory();

  const location = useLocation();

  const path = "/portfolio";

  const PortfolioTabs = (
    <StyledTabs
      value={value}
      indicatorColor="primary"
      onChange={(e, val) => {
        setValue(val);
      }}
    >
      <StyledTab
        onClick={() => history.push(`${path}/charts`)}
        label="Charts"
      ></StyledTab>

      <StyledTab
        onClick={() => history.push(`${path}/holdings`)}
        label="Holdings"
      ></StyledTab>

      <StyledTab
        onClick={() => history.push(`${path}/transactions`)}
        label="Transactions"
      ></StyledTab>

      <StyledTab
        onClick={() => history.push(`${path}/openorders`)}
        label="Open Orders"
      ></StyledTab>
    </StyledTabs>
  );

  return (
    <ThemeProvider theme={theme}>
      <PortfolioWrapper>
        {/* <div>
          <ListMyExchanges enableEditing={false} />
        </div> */}
        <CustomFlexCard>{PortfolioTabs}</CustomFlexCard>
        <Switch>
          <Route exact path={`${path}`}>
            <PortfolioSummary />
          </Route>
          <Route exact path={`${path}/charts`}>
            <Charts />
          </Route>
          {/* <Route exact path={`${path}/holdings`}>
            <Holdings  />
          </Route> */}
          <Route exact path={`${path}/transactions`}>
            <Transactions />
          </Route>
          <Route exact path={`${path}/openorders`}>
            <OpenOrders />
          </Route>
        </Switch>
      </PortfolioWrapper>
    </ThemeProvider>
  );
};
