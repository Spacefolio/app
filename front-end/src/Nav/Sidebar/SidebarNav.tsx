import React from "react";
import { NavLink } from "react-router-dom";
import {
  DesktopContainer,
  LinkWrapper,
  MobileContainer,
  LinkText,
} from "./SidebarStyle";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
} from "../../_components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";

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
    <NavLink
      to="/portfolio"
      className="sidebar-tab"
      activeClassName="active-sidebar-tab"
    >
      <LinkWrapper>
        <PortfolioIcon />
        {(!isSidebarCollapsed || viewType == "mobile") && (
          <LinkText>Portfolio</LinkText>
        )}
      </LinkWrapper>
    </NavLink>
  );

  const Bots = (
    <NavLink
      to="/bots"
      className="sidebar-tab"
      activeClassName="active-sidebar-tab"
    >
      <LinkWrapper>
        <BotsIcon />
        {(!isSidebarCollapsed || viewType == "mobile") && (
          <LinkText>Bots</LinkText>
        )}
      </LinkWrapper>
    </NavLink>
  );

  const Dashboard = (
    <NavLink
      to="/dashboard"
      className="sidebar-tab"
      activeClassName="active-sidebar-tab"
    >
      <LinkWrapper>
        <DashboardIcon />
        {(!isSidebarCollapsed || viewType == "mobile") && (
          <LinkText>Dashboard</LinkText>
        )}
      </LinkWrapper>
    </NavLink>
  );

  return (
    <React.Fragment>
      {viewType == "desktop" ? (
        <DesktopContainer isSidebarCollapsed={isSidebarCollapsed}>
          {Dashboard}
          {Portfolio}
          {Bots}
        </DesktopContainer>
      ) : (
        <MobileContainer>
          {Dashboard}
          {Portfolio}
          {Bots}
        </MobileContainer>
      )}
    </React.Fragment>
  );
};
