import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

import { Portfolio } from "../Portfolio";
import { Dashboard } from "../Dashboard";
import { Nav, SidebarNav } from "../Nav";
import {
  ApplicationContainer,
  ApplicationFlexContainer,
  BodyWrapper,
} from "./applicationStyles";
import useDimensions from "react-use-dimensions";
import { applicationViewActions } from "../_actions/applicationView.actions";
import { RD } from "../GlobalStyles/ResponsiveDesign";
import { IRootState } from "../_reducers";
import { BottomNav } from "../Nav";

export const Application = () => {
  const dispatch = useDispatch();

  const [ref, { width }] = useDimensions();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const flexSizing = () => {
    if (applicationWidth >= parseInt(RD.breakpointmonitor)) {
      return { maxWidth: RD.widthmonitor };
    } else if (
      applicationWidth < parseInt(RD.breakpointmonitor) &&
      applicationWidth >= parseInt(RD.breakpointlaptop)
    ) {
      return { maxWidth: RD.widthlaptop };
    } else if (
      applicationWidth < parseInt(RD.breakpointlaptop) &&
      applicationWidth >= parseInt(RD.breakpointtablet)
    ) {
      return { maxWidth: RD.widthtablet };
    } else if (
      applicationWidth < parseInt(RD.breakpointtablet) &&
      applicationWidth >= parseInt(RD.breakpointsmartphone)
    ) {
      return { maxWidth: RD.widthsmartphone };
    }
  };

  const [appWidth, setAppWidth] = useState(flexSizing());

  useEffect(() => {
    dispatch(applicationViewActions.UpdateApplicationWidth(width));
    setAppWidth(flexSizing());
  }, [width]);

  return (
    <React.Fragment>
      <Nav />
      <BodyWrapper>
        {viewType == "desktop" && <SidebarNav />}
        <ApplicationContainer viewType={viewType} ref={ref}>
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
      {viewType == "mobile" && <BottomNav/>}
    </React.Fragment>
  );
};
