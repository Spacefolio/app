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
import {
  PortfolioWrapper,
  TabWrapper,
  TabItem,
  PortfolioSidebarWrapper,
  PortfolioSectionWrapper,
} from "./portfolioStyles";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from ".";
import { portfolioActions } from "../_actions";
import { ExchangeSidebarFilter } from "./ExchangeSidebarFilter/ExchangeSidebarFilter";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";
import { IRootState } from "../_reducers";
import { FlexCard, Scrollbox } from "../GlobalStyles";

interface IPortfolioProps {}

export const Portfolio: React.FC<IPortfolioProps> = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state: IRootState) => state.portfolio.portfolioData);
  const width = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  const { path } = useRouteMatch("/portfolio");

  useEffect(() => {
    !portfolioData && dispatch(portfolioActions.refresh());
  }, [portfolioData]);

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
        {/* <FlexCard styles={{ alignItems: "start", height: "100%" }}> */}
          <ExchangeSidebarFilter />
        {/* </FlexCard> */}
      </PortfolioSidebarWrapper>
    ) : null;

  const FilterByExchangeMobile =
    width <= parseInt(RD.breakpointtablet) ? (
      <FlexCard
        style={{
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
          {/* {FilterByExchangeMobile} */}
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
