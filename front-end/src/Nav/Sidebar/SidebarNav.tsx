import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./SidebarNav.scss";
import {
  DesktopContainer,
  LinkWrapper,
  MobileBlurWrapper,
  MobileContainer,
} from "./SidebarStyle";
import { ModalBg, ModalWrapper } from "../../_components/Modal/generalStyle";
import { BotHead, PortfolioIcon, Speedometer } from "../../_components/Icons";

interface SidebarNavProps {
  CollapseSidebar: any;
  isSidebarCollapsed: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  isSidebarCollapsed,
  CollapseSidebar,
}) => {
  const Portfolio = (
    <NavLink
      to="/portfolio"
      className="sidebar-tab"
      activeClassName="active-sidebar-tab"
    >
      <LinkWrapper>
        <Speedometer />
        Portfolio
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
        Bots
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
        <PortfolioIcon />
        Dashboard
      </LinkWrapper>
    </NavLink>
  );

  return (
    <React.Fragment>
      <DesktopContainer
        style={{
          marginRight: "8px",
          width: isSidebarCollapsed ? "50px" : "300px",
        }}
      >
        {Dashboard}
        {Portfolio}
        {Bots}
      </DesktopContainer>

      {isSidebarCollapsed ? (
        <MobileBlurWrapper>
          <MobileContainer>
            {Dashboard}
            {Portfolio}
            {Bots}
          </MobileContainer>
          <ModalBg onClick={() => CollapseSidebar(false)} />
        </MobileBlurWrapper>
      ) : null}
    </React.Fragment>
  );
};
