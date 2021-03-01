import React, { useEffect } from "react";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
  ArrowIcon,
} from "../../_components/Icons";
import {
  LinkText,
  LinkWrapper,
  NavTab,
  SidebarDetailsButton,
  SidebarIconContainer,
  TabSubContentContainer,
} from "./SidebarStyles";
import { ExchangeSidebarFilter } from "../../Portfolio/ExchangeSidebarFilter/ExchangeSidebarFilter";
import { IViewType } from "../../../../types";
import { Route, useRouteMatch } from "react-router";
import { useState } from "react";
import { Modal } from "@material-ui/core";

export function BotSection(isSidebarCollapsed: boolean, viewType: IViewType) {
  const [subIsVisible, setSubIsVisible] = useState(false);

  useEffect(() => {
    isSidebarCollapsed && setSubIsVisible(false);
  }, [isSidebarCollapsed]);

  const tabUri = "/bots";
  return (
    <React.Fragment>
      <LinkWrapper>
        <NavTab to={tabUri} activeClassName="active-sidebar-tab">
          <SidebarIconContainer>
            <BotsIcon />
          </SidebarIconContainer>
          <LinkText isVisible={!isSidebarCollapsed}>Bots</LinkText>
        </NavTab>
        <SidebarDetailsButton onClick={() => setSubIsVisible(!subIsVisible)}>
          <ArrowIcon direction={subIsVisible ? "up" : "down"} />
        </SidebarDetailsButton>
      </LinkWrapper>
      <Route path={tabUri}>
        <TabSubContentContainer isActiveTab={subIsVisible}>
          {/* <ExchangeSidebarFilter /> */}
        </TabSubContentContainer>
      </Route>
    </React.Fragment>
  );
}

export function DashboardSection(
  isSidebarCollapsed: boolean,
  viewType: IViewType
) {
  const [subIsVisible, setSubIsVisible] = useState(false);

  useEffect(() => {
    isSidebarCollapsed && setSubIsVisible(false);
  }, [isSidebarCollapsed]);

  const tabUri = "/dashboard";
  return (
    <React.Fragment>
      <LinkWrapper>
        <NavTab to={tabUri} activeClassName="active-sidebar-tab">
          <SidebarIconContainer>
            <DashboardIcon />
          </SidebarIconContainer>
          <LinkText isVisible={!isSidebarCollapsed}>Dashboard</LinkText>
        </NavTab>
        <SidebarDetailsButton onClick={() => setSubIsVisible(!subIsVisible)}>
          <ArrowIcon direction={subIsVisible ? "up" : "down"} />
        </SidebarDetailsButton>
      </LinkWrapper>
      <Route path={tabUri}>
        <TabSubContentContainer isActiveTab={subIsVisible}>
          {/* <ExchangeSidebarFilter /> */}
        </TabSubContentContainer>
      </Route>
    </React.Fragment>
  );
}

export function PortfolioSection(
  isSidebarCollapsed: boolean,
  viewType: IViewType
) {
  const [subIsVisible, setSubIsVisible] = useState(false);

  useEffect(() => {
    isSidebarCollapsed && setSubIsVisible(false);
  }, [isSidebarCollapsed]);

  const tabUri = "/portfolio";
  return (
    <React.Fragment>
      <LinkWrapper>
        <NavTab to={tabUri} activeClassName="active-sidebar-tab">
          <SidebarIconContainer>
            <PortfolioIcon />
          </SidebarIconContainer>
          <LinkText isVisible={!isSidebarCollapsed}>Portfolio</LinkText>
        </NavTab>
        <SidebarDetailsButton onClick={() => setSubIsVisible(!subIsVisible)}>
          <ArrowIcon direction={subIsVisible ? "up" : "down"} />
        </SidebarDetailsButton>
      </LinkWrapper>
      <Route path={tabUri}>
        <TabSubContentContainer isActiveTab={subIsVisible}>
          <ExchangeSidebarFilter />
        </TabSubContentContainer>
      </Route>
    </React.Fragment>
  );
}
