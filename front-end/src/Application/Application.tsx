import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Portfolio } from "../portfolio";
import { Dashboard } from "../dashboard";
import { MobileNav, MobileTopNav, DesktopTopNav, SidebarNav } from "../nav";
import {
  ApplicationContainer,
  ApplicationFlexContainer,
  BodyWrapper,
} from "./styles";
import { RD } from "../_styles/ResponsiveDesign";
import { IRootState } from "../_reducers";
import { Settings } from "../settings";
import { GrowFromZero } from "../_styles";
import { portfolioActions } from "../_actions";
import useMedia from "use-media";
import { Container } from "@material-ui/core";
import { Bots } from "../bots";
import { Trade } from "../trade";
import { Modal } from "../_components";
import { ThemeProvider } from "styled-components";
import { BottomNavbar } from "../nav/bottom/Styles";
import { applicationViewActions } from "../_actions/applicationView.actions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

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
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <React.Fragment>
        <Modal />
        <BodyWrapper>
          <SidebarNav />
          <ApplicationContainer
            isMobile={isMobile}
            isSidebarCollapsed={isSidebarCollapsed}
            onClick={() => {
              if (isMobile && !isSidebarCollapsed) {
                dispatch(applicationViewActions.toggleSidebar(true));
              }
            }}
          >
            {isMobile ? <MobileTopNav /> : <DesktopTopNav />}

            <ApplicationFlexContainer
              isMobile={isMobile}
              isSidebarCollapsed={isSidebarCollapsed}
            >
              <Switch>
                <Route path={`/portfolio`}>
                  <Portfolio />
                </Route>
                <Route exact path={`/dashboard`}>
                  <Dashboard />
                </Route>
                <Route path={"/settings"}>
                  <Settings />
                </Route>
                <Route exact path={"/bots"}>
                  <Bots />
                </Route>
                <Route exact path={"/trade"}>
                  <Trade />
                </Route>
                <Redirect to="/dashboard" />
              </Switch>
            </ApplicationFlexContainer>
          </ApplicationContainer>
        </BodyWrapper>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};
