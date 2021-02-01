import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../_helpers";
import { alertActions } from "../_actions";
import { PrivateRoute } from "../_components";
import { Application } from "../Application";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";

import "./App.scss";

export const App = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const clearAlerts = alertActions.clear;

  history.listen((location, action) => {
    dispatch(clearAlerts());
  });
  return (
    <div id="app-wrapper">
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/trade" component={Application} />
          <PrivateRoute exact path="/portfolio" component={Application} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Redirect from="*" to="/trade" />
        </Switch>
      </Router>
    </div>
  );
};
