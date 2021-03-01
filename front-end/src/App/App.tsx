import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { Application } from "../Application";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { Alert, ErrorBoundary } from "../_components";

import "./App.scss";
import { AppContainer } from "./appStyles";
import "../GlobalStyles/variables.scss";
import { applicationViewActions } from "../_actions/applicationView.actions";

export const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const clearAlerts = alertActions.clear;

  history.listen((location: any, action: any) => {
    dispatch(clearAlerts());
    dispatch(applicationViewActions.toggleSidebar('mobile', false));
  });
  return (
    <AppContainer>
      <Alert />
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <PrivateRoute path="/" component={Application} />
          <Redirect from="*" to="" />
        </Switch>
      </Router>
    </AppContainer>
  );
};
