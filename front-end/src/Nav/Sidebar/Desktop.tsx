import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DesktopContainer,
} from "./SidebarStyles";
import { IRootState } from "../../_reducers";
import { PortfolioSection, BotSection, DashboardSection } from "./NavSections";

interface BottomNavProps {}

export const DesktopSidebar: React.FC<BottomNavProps> = ({}) => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  return (
    <DesktopContainer isSidebarCollapsed={isSidebarCollapsed}>
      {DashboardSection(isSidebarCollapsed, viewType)}
      {PortfolioSection(isSidebarCollapsed, viewType)}
      {BotSection(isSidebarCollapsed, viewType)}
    </DesktopContainer>
  );
};

