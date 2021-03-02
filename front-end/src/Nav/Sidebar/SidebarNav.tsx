import React from "react";
import { SidebarContainer } from "./SidebarStyles";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { SidebarActionItem } from "./NavSections";
import { Drawer } from "@material-ui/core";
import { BotsIcon, DashboardIcon, PortfolioIcon } from "../../_components";
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

  return (
    <SidebarContainer isSidebarCollapsed={isSidebarCollapsed}>
      <SidebarActionItem
        text="Dashboard"
        icon={<DashboardIcon />}
        linkUri="/dashboard"
      >

      </SidebarActionItem>

      <SidebarActionItem
        text="Portfolio"
        icon={<PortfolioIcon />}
        linkUri="/portfolio"
      >
        <ExchangeSidebarFilter />
      </SidebarActionItem>

      <SidebarActionItem
        text="Bots"
        icon={<BotsIcon />}
        linkUri="/bots"
      >

      </SidebarActionItem>
    </SidebarContainer>
  );
};
