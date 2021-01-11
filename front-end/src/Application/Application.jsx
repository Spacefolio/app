import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../_components";
import { history } from "../_helpers";
import { Portfolio } from "../Portfolio";
import { Dashboard } from "../Dashboard";
import { Nav } from "../Nav";
import './Application.scss';

export const Application = () => {
  const dispatch = useDispatch();


  return (
    <div className="viewport-container">
      <Nav />
      <Router history={history}>
        <PrivateRoute path="/portfolio" component={Portfolio} />
        <PrivateRoute path="/trade" component={Dashboard} />
      </Router>
    </div>
  );
};
