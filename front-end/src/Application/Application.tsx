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
import { Bots } from "../Bots";
import { Trade } from "../Trade";
import { Modal } from "../_components";
import { ThemeProvider } from "styled-components";
import { BottomNavbar } from "../Nav/BottomNav/Styles";
import { applicationViewActions } from "../_actions/applicationView.actions";

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
              <Route exact path={`/portfolio`}>
                <Portfolio />
              </Route>
              <Route exact path={`/dashboard`}>
                <Dashboard />
              </Route>
              <Route exact path={"/settings"}>
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
  );
};
