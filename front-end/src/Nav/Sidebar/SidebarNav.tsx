import React from "react";
import { DesktopContainer } from "./SidebarStyles";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { DashboardSection, PortfolioSection, BotSection } from "./NavSections";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  return (
    <DesktopContainer isSidebarCollapsed={isSidebarCollapsed}>
      {DashboardSection(isSidebarCollapsed, viewType)}
      {PortfolioSection(isSidebarCollapsed, viewType)}
      {BotSection(isSidebarCollapsed, viewType)}
    </DesktopContainer>
  );
};
