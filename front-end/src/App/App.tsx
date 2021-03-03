import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { Application } from "../Application";
import { LoginPage, RegisterPage } from "../RegisterPage";
import { Alert, ErrorBoundary } from "../_components";
import "typeface-roboto";
import "./App.scss";
import { AppContainer } from "./appStyles";
import "../GlobalStyles/variables.scss";
import { applicationViewActions } from "../_actions/applicationView.actions";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

export const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const clearAlerts = alertActions.clear;

  history.listen((location: any, action: any) => {
    dispatch(clearAlerts());
  });
  return (
    <ScopedCssBaseline>
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
    </ScopedCssBaseline>
  );
};
