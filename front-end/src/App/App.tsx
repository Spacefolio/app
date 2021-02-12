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
import { AppContainer } from "./generalStyle";
import "./variables.scss";

export const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const clearAlerts = alertActions.clear;

  history.listen((location: any, action: any) => {
    console.log(location, action);
    dispatch(clearAlerts());
  });
  return (
    <ErrorBoundary>
      <AppContainer>
        <Alert />
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="" component={Application} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Redirect from="*" to="/"/>
          </Switch>
        </Router>
      </AppContainer>
    </ErrorBoundary>
  );
};
