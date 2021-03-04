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
import { PortfolioWrapper, PortfolioSectionWrapper } from "./portfolioStyles";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from ".";
import { portfolioActions } from "../_actions";
import { IRootState } from "../_reducers";
import { FlexCard, GrowFromZero, Scrollbox } from "../GlobalStyles";
import { Tabs, Tab, Paper } from "@material-ui/core";
import { useState } from "react";

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector(
    (state: IRootState) => state.portfolio.portfolioData
  );
  const width = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );
  const [value, setValue] = useState(0);
  const { path } = useRouteMatch("/portfolio");

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    !portfolioData && dispatch(portfolioActions.refresh());
  }, [portfolioData]);

  useEffect(() => {
    switch (location.pathname) {
      case path + "/charts":
        setValue(0);
        break;
      case path + "/holdings":
        setValue(1);
        break;
      case path + "/transactions":
        setValue(2);
        break;
      case path + "/orders":
        setValue(3);
        break;
    }
  }, []);

  const PortfolioTabs = (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={(e, val) => {
        console.log(e, val);
        setValue(val);
      }}
    >
      <Tab onClick={() => history.push(path + "/charts")} label="Charts"></Tab>

      <Tab
        onClick={() => history.push(path + "/holdings")}
        label="Holdings"
      ></Tab>

      <Tab
        onClick={() => history.push(path + "/transactions")}
        label="Transactions"
      ></Tab>

      <Tab
        onClick={() => history.push(path + "/orders")}
        label="Open Orders"
      ></Tab>
    </Tabs>
  );

  // const FilterByExchangeDesktop =
  //   width > parseInt(RD.breakpointtablet) ? (
  //     <PortfolioSidebarWrapper>
  //       <ExchangeSidebarFilter />
  //     </PortfolioSidebarWrapper>
  //   ) : null;

  // const FilterByExchangeMobile =
  //   width <= parseInt(RD.breakpointtablet) ? (
  //     <FlexCard
  //       style={{
  //         marginBottom: SPACING.flexCardGap,
  //         width: "100%",
  //         alignItems: "center",
  //       }}
  //     >
  //       <ExchangeSidebarFilter />
  //     </FlexCard>
  //   ) : null;

  return (
    <PortfolioWrapper>
        <PortfolioSectionWrapper>
          {/* {FilterByExchangeMobile} */}
          <GrowFromZero in={true}>
            <FlexCard
              style={{
                padding: 0,
                borderRadius: ".5rem",
              }}
            >
              <MetaPortfolio />
            </FlexCard>
          </GrowFromZero>
          {PortfolioTabs}
          <Switch>
            <Route exact path={`${path}/charts`} component={Charts} />
            <Route
              exact
              path={`${path}/transactions`}
              component={Transactions}
            />
            <Route exact path={`${path}/orders`} component={OpenOrders} />
            <Route exact path={`${path}/holdings`} component={Holdings} />
            <Redirect from={`${path}`} to={`${path}/charts`} />
          </Switch>
        </PortfolioSectionWrapper>
    </PortfolioWrapper>
  );
};
