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
import { history } from "../_helpers";
import "./Portfolio.scss";
import { PrivateRoute } from "../_components";
import { PortfolioWrapper, TabWrapper, TabItem } from "./generalStyle";
import { userActions } from "../_actions";
import { MetaPortfolio, Transactions, OpenOrders, Holdings, Charts } from "../Portfolio";

export const Portfolio = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const { path } = useRouteMatch("/portfolio");

  return (
    <PortfolioWrapper>
      <MetaPortfolio/>
      <TabWrapper>
        <TabItem>
          <NavLink activeClassName='active-page-btn' to={`${path}/charts`}>Charts</NavLink>
        </TabItem>
        <TabItem>
          <NavLink activeClassName='active-page-btn' to={`${path}/holdings`}>Holdings</NavLink>
        </TabItem>
        <TabItem>
          <NavLink activeClassName='active-page-btn' to={`${path}/transactions`}>Transactions</NavLink>
        </TabItem>
        <TabItem>
          <NavLink activeClassName='active-page-btn' to={`${path}/orders`}>Orders</NavLink>
        </TabItem>
      </TabWrapper>
      <Switch>
        <Route exact path={`${path}/charts`} component={Charts} />
        <Route exact path={`${path}/transactions`} component={Transactions} />
        <Route exact path={`${path}/orders`} component={OpenOrders} />
        <Route exact path={`${path}/holdings`} component={Holdings} />
        <Redirect from="/" to={`${path}/charts`} />
      </Switch>
    </PortfolioWrapper>
  );
};
