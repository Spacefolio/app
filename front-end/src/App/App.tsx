import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { Application } from "../Application";
import { Alert } from "../_components";
import "typeface-roboto";
import "./App.scss";
import { AppContainer } from "./styles";
import "../_styles/variables.scss";
import { CssBaseline } from "@material-ui/core";
import { GetStarted } from "../Login/login";

export const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);

  const clearAlerts = alertActions.clear;

  history.listen((location: any, action: any) => {
    dispatch(clearAlerts());
  });
  return (
    <React.Fragment>
      <CssBaseline />
      <AppContainer>
        <Alert />
        <Router history={history}>
          <Switch>
            <Route exact path="/login" component={GetStarted} />
            <PrivateRoute path="/" component={Application} />
            <Redirect from="*" to="" />
          </Switch>
        </Router>
      </AppContainer>
    </React.Fragment>
  );
};
