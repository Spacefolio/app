import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Route, Switch, useRouteMatch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../_components";
import { history } from "../_helpers";
import { Portfolio } from "../Portfolio";
import { Dashboard } from "../Dashboard";
import { Nav } from "../Nav";
import { ApplicationContainer, ApplicationFlexContainer } from "./generalStyle";

export const Application = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Nav />
      <ApplicationContainer>
        <ApplicationFlexContainer>
          <Switch>
            <Route path={`/portfolio`} component={Portfolio} />
            <Route exact path={`/dashboard`} component={Dashboard} />
          </Switch>
        </ApplicationFlexContainer>
      </ApplicationContainer>
    </React.Fragment>
  );
};
