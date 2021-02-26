import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";
import { PrivateRoute } from "../_components";
import { history } from "../_helpers";
import { Portfolio } from "../Portfolio";
import { Dashboard } from "../Dashboard";
import { Nav, SidebarNav } from "../Nav";
import {
  ApplicationContainer,
  ApplicationFlexContainer,
  BodyWrapper,
} from "./generalStyle";
import useDimensions from "react-use-dimensions";
import { applicationViewActions } from "../_actions/applicationView.actions";
import { RD } from "./ResponsiveDesign";

export const Application = () => {
  const dispatch = useDispatch();

  const [ref, { width }] = useDimensions();

  const flexSizing = () => {
    if (width >= parseInt(RD.breakpointmonitor)) {
      return{maxWidth: RD.widthmonitor}
    }
  };

  const [appWidth, setAppWidth] = useState(flexSizing());

  useEffect(() => {
    dispatch(applicationViewActions.UpdateApplicationWidth(width));
    setAppWidth(flexSizing());
  }, [width]);

  return (
    <div>
      <Nav />
      <BodyWrapper>
        <SidebarNav />

        <ApplicationContainer ref={ref}>
          <ApplicationFlexContainer style={appWidth}>
            <Switch>
              <Route path={`/portfolio`}>
                <Portfolio />
              </Route>
              <Route path={`/dashboard`}>
                <Dashboard />
              </Route>
              <Redirect to="/dashboard" />
            </Switch>
          </ApplicationFlexContainer>
        </ApplicationContainer>
      </BodyWrapper>
    </div>
  );
};
