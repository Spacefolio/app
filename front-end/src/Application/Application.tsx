import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Portfolio } from "../Portfolio";
import { Dashboard } from "../Dashboard";
import { MobileNav, MobileTopNav, DesktopTopNav, SidebarNav } from "../Nav";
import {
  ApplicationContainer,
  ApplicationFlexContainer,
  BodyWrapper,
} from "./Styles";
import { RD } from "../AlgonexStyles/ResponsiveDesign";
import { IRootState } from "../_reducers";
import { Settings } from "../Settings";
import { GrowFromZero } from "../AlgonexStyles";
import { portfolioActions } from "../_actions";
import useMedia from "use-media";
import { Container } from "@material-ui/core";

export const Application = () => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const filterId = useSelector((state: IRootState) => state.portfolio.filterId);

  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

  useEffect(() => {
    dispatch(portfolioActions.refresh(filterId));
  }, []);

  return (
    <React.Fragment>
      <BodyWrapper style={{ marginBottom: isMobile ? "50px" : "0px" }}>
        {!isMobile && <SidebarNav />}
        <ApplicationContainer
          isMobile={isMobile}
          isSidebarCollapsed={isSidebarCollapsed}
        >
          {isMobile ? <MobileTopNav /> : <DesktopTopNav />}
          <GrowFromZero in={true}>
            <ApplicationFlexContainer
              isMobile={isMobile}
              isSidebarCollapsed={isSidebarCollapsed}
            >
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
      {isMobile && <MobileNav />}
    </React.Fragment>
  );
};
