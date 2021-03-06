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
import { MobileNav } from "../Nav/Sidebar/BottomNav";
import { Settings } from "../Settings";
import { GrowFromZero } from "../GlobalStyles";
import { portfolioActions } from "../_actions";

export const Application = () => {
  const dispatch = useDispatch();

  const [AppContainerRef, { width: appWidth }] = useDimensions();

  const applicationWidth = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

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
      return { maxWidth: "100%" };
    }
  };

  var lastWidth: number;

  useEffect(() => {
    dispatch(applicationViewActions.UpdateApplicationWidth(appWidth));
    if (lastWidth > appWidth) {
      dispatch(applicationViewActions.toggleSidebar());
    }
  }, [appWidth, isSidebarCollapsed]);

  useEffect(() => {
    dispatch(portfolioActions.refresh(filterId));
  }, []);

  return (
    <React.Fragment>
      <BodyWrapper
        style={{ marginBottom: viewType == "mobile" ? "50px" : "0px" }}
      >
        {viewType == "desktop" && <SidebarNav />}
        <ApplicationContainer
          viewType={viewType}
          isSidebarCollapsed={isSidebarCollapsed}
          ref={AppContainerRef}
        >
          <Nav />
          <GrowFromZero in={true}>
            <ApplicationFlexContainer style={flexSizing()}>
              <Switch>
                <Route path={`/portfolio`}>
                  <Portfolio />
                </Route>
                <Route path={`/dashboard`}>
                  <Dashboard />
                </Route>
                <Route path={"/settings"}>
                  <Settings />
                </Route>
                <Redirect to="/dashboard" />
              </Switch>
            </ApplicationFlexContainer>
          </GrowFromZero>
        </ApplicationContainer>
      </BodyWrapper>
      {viewType == "mobile" && <MobileNav />}
    </React.Fragment>
  );
};
