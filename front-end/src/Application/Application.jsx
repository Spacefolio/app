import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../_components";
import { history } from "../_helpers";
import {Portfolio} from "../Portfolio";
import {Dashboard} from '../Dashboard';
import {Nav} from '../Nav';
1
export const Application = () => {
  const dispatch = useDispatch();
  
  //pull in the current page of the redux state and render the cooresponding page under the nav

  return(
    <div>
      <Nav />
      <Router history={history}>
          <PrivateRoute path="/portfolio" component={Portfolio} />
          <PrivateRoute path="/trade" component={Dashboard} />
      </Router>
    </div>
  );
}