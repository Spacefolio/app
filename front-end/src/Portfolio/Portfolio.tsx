import React, { useEffect } from "react";
import {
  NavLink,
  Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Portfolio.scss";
import { FlexCard, PrivateRoute } from "../_components";
import {
  PortfolioWrapper,
  TabWrapper,
  TabItem,
  PortfolioSidebarWrapper,
  PortfolioSectionWrapper,
} from "./portfolioStyles";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from ".";
import { portfolioActions } from "../_actions";
import { Scrollbox } from "../_components/Scrollbox/Scrollbox";
import { ExchangeSidebarFilter } from "./ExchangeSidebarFilter/ExchangeSidebarFilter";
import useDimensions from "react-use-dimensions";
import { RD, SPACING } from "../Application/ResponsiveDesign";

interface IPortfolioProps {
  width: number;
}

export const Portfolio: React.FC<IPortfolioProps> = ({ width }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authentication.user);

  const { path } = useRouteMatch("/portfolio");

  useEffect(() => {
    dispatch(portfolioActions.refresh());
  }, []);

  const PortfolioTabs = (
    <TabWrapper>
      <NavLink activeClassName="active-porfolio-tab" to={`${path}/charts`}>
        <TabItem>Charts</TabItem>
      </NavLink>

      <NavLink activeClassName="active-porfolio-tab" to={`${path}/holdings`}>
        <TabItem>Holdings</TabItem>
      </NavLink>

      <NavLink
        activeClassName="active-porfolio-tab"
        to={`${path}/transactions`}
      >
        <TabItem>Transactions</TabItem>
      </NavLink>

      <NavLink activeClassName="active-porfolio-tab" to={`${path}/orders`}>
        <TabItem>Open Orders</TabItem>
      </NavLink>
    </TabWrapper>
  );

  const FilterByExchangeDesktop =
    width > parseInt(RD.breakpointtablet) ? (
      <PortfolioSidebarWrapper>
        <FlexCard styles={{ alignItems: "start" }}>
          <ExchangeSidebarFilter />
        </FlexCard>
      </PortfolioSidebarWrapper>
    ) : null;


  const FilterByExchangeMobile =
    width <= parseInt(RD.breakpointtablet) ? (
      <FlexCard
        styles={{
          marginBottom: SPACING.flexCardGap,
          width: "100%",
          alignItems: "center",
        }}
      >
        <ExchangeSidebarFilter />
      </FlexCard>
    ) : null;


  return (
    <PortfolioWrapper>
      {FilterByExchangeDesktop}
      <Scrollbox>
        <PortfolioSectionWrapper>
          {FilterByExchangeMobile}
          <FlexCard>
            <MetaPortfolio />
          </FlexCard>
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
      </Scrollbox>
    </PortfolioWrapper>
  );
};
