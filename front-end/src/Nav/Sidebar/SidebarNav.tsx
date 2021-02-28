import React from "react";
import {
  DesktopContainer,
  LinkText,
  NavTab,
  TabSubContentContainer,
  SidebarIconContainer,
} from "./SidebarStyles";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
} from "../../_components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { ExchangeSidebarFilter } from "../../Portfolio/ExchangeSidebarFilter/ExchangeSidebarFilter";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const Portfolio = (
    <React.Fragment>
      <NavTab to="/portfolio" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <PortfolioIcon />
        </SidebarIconContainer>
        <LinkText isVisible={!isSidebarCollapsed}>Portfolio</LinkText>
      </NavTab>
      <TabSubContentContainer viewType={viewType} isActiveTab={false}>
        <ExchangeSidebarFilter />
      </TabSubContentContainer>
    </React.Fragment>
  );

  const Bots = (
    <React.Fragment>
      <NavTab to="/bots" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <BotsIcon />
        </SidebarIconContainer>
        <LinkText isVisible={!isSidebarCollapsed}>Bots</LinkText>
      </NavTab>
      <TabSubContentContainer viewType={viewType} isActiveTab={false}>
        <ExchangeSidebarFilter />
      </TabSubContentContainer>
    </React.Fragment>
  );

  const Dashboard = (
    <React.Fragment>
      <NavTab to="/dashboard" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <DashboardIcon />
        </SidebarIconContainer>
        <LinkText isVisible={!isSidebarCollapsed}>Dashboard</LinkText>
      </NavTab>
      <TabSubContentContainer viewType={viewType} isActiveTab={false}>
        <ExchangeSidebarFilter />
      </TabSubContentContainer>
    </React.Fragment>
  );

  return (
    <DesktopContainer
      // onMouseOver={() => {
      //   isSidebarCollapsed &&
      //     dispatch(applicationViewActions.toggleSidebar());
      // }}
      isSidebarCollapsed={isSidebarCollapsed}
    >
      {Dashboard}
      {Portfolio}
      {Bots}
    </DesktopContainer>
  );
};
