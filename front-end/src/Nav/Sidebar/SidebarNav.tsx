import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SidebarNav.scss";
import {
  DesktopContainer,
  LinkWrapper,
  MobileBlurWrapper,
  MobileContainer,
  LinkText,
} from "./SidebarStyle";
import { ModalBg, ModalWrapper } from "../../_components/Modal/generalStyle";
import { BotHead, PortfolioIcon, Speedometer } from "../../_components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { dispatch } from "d3";
import { applicationViewActions } from "../../_actions/applicationView.actions";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const isSidebarVisible = useSelector(
    (state: IRootState) => state.applicationView.isSidebarVisible
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
        {!isSidebarCollapsed || viewType == "mobile" ? (
          <LinkText>Portfolio</LinkText>
        ) : null}
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
        <BotHead />
        {!isSidebarCollapsed || viewType == "mobile" ? (
          <LinkText>Bots</LinkText>
        ) : null}
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
        <Speedometer />
        {!isSidebarCollapsed || viewType == "mobile" ? (
          <LinkText>Dashboard</LinkText>
        ) : null}
      </LinkWrapper>
    </NavLink>
  );

  return (
    <React.Fragment>
      <DesktopContainer
        style={{
          width: isSidebarCollapsed ? "50px" : "300px",
          alignItems: isSidebarCollapsed ? "center" : "start",
        }}
      >
        {Dashboard}
        {Portfolio}
        {Bots}
      </DesktopContainer>

      {viewType == "mobile" ? (
        <MobileBlurWrapper>
          {Dashboard}
          {Portfolio}
          {Bots}
        </MobileBlurWrapper>
      ) : null}
    </React.Fragment>
  );
};
