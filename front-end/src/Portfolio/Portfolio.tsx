import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { LinkText, NavTab } from "../Nav/Sidebar/SidebarStyles";

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
      <NavTab activeClassName="active-porfolio-tab" to={`${path}/charts`}>
        <LinkText>Charts</LinkText>
      </NavTab>

      <NavTab activeClassName="active-porfolio-tab" to={`${path}/holdings`}>
        <LinkText>Holdings</LinkText>
      </NavTab>

      <NavTab
        activeClassName="active-porfolio-tab"
        to={`${path}/transactions`}
      >
        <LinkText>Transactions</LinkText>
      </NavTab>

      <NavTab activeClassName="active-porfolio-tab" to={`${path}/orders`}>
        <LinkText>Open Orders</LinkText>
      </NavTab>
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
