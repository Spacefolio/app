import React from "react";
import { MobileContainer, NavTab } from "./BottomNavStyles";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
} from "../../_components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { SidebarIconContainer } from "../Sidebar/SidebarStyles";

interface BottomNavProps {}

export const BottomNav: React.FC<BottomNavProps> = ({}) => {
  const dispatch = useDispatch();

  const Portfolio = (
    <React.Fragment>
      <NavTab to="/portfolio" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <PortfolioIcon />
        </SidebarIconContainer>
      </NavTab>
    </React.Fragment>
  );

  const Bots = (
    <React.Fragment>
      <NavTab to="/bots" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <BotsIcon />
        </SidebarIconContainer>
      </NavTab>
    </React.Fragment>
  );

  const Dashboard = (
    <React.Fragment>
      <NavTab to="/dashboard" activeClassName="active-sidebar-tab">
        <SidebarIconContainer>
          <DashboardIcon />
        </SidebarIconContainer>
      </NavTab>
    </React.Fragment>
  );

  return (
    <MobileContainer>
      {Dashboard}
      {Portfolio}
      {Bots}
    </MobileContainer>
  );
};