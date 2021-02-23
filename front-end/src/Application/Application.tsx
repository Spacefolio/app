import React, { useState } from "react";
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

export const Application = () => {
  const dispatch = useDispatch();

  const [ref, { width }] = useDimensions();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div>
      <Nav
        isSidebarCollapsed={isSidebarCollapsed}
        collapseSidebar={setIsSidebarCollapsed}
      />
      <BodyWrapper>
        <SidebarNav
          CollapseSidebar={setIsSidebarCollapsed}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <ApplicationContainer ref={ref}>
          <ApplicationFlexContainer>
            <Switch>
              <Route path={`/portfolio`}>
                <Portfolio width={width} />
              </Route>
              <Route exact path={`/dashboard`} component={Dashboard} />
              <Redirect to="/" />
            </Switch>
          </ApplicationFlexContainer>
        </ApplicationContainer>
      </BodyWrapper>
    </div>
  );
};
