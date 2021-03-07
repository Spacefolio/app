import React from "react";
import { SidebarContainer, SidebarSpacer } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { SidebarActionItem } from "./ActionItem/ActionItem";
import { Dashboard, PieChart, Settings, Timeline } from "@material-ui/icons";

import { RD } from "../../AlgonexStyles/ResponsiveDesign";

import useMedia from "use-media";
import { AlgonexLogo } from "../../AlgonexStyles";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = () => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

  return (
    <SidebarContainer
      isSidebarCollapsed={isSidebarCollapsed}
      // isFixed={width <= parseInt(RD.breakpointsmartphone) ? true : false}
    >
      <SidebarActionItem
        text="ALGONEX"
        icon={<AlgonexLogo />}
        linkUri="/dashboard"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Dashboard"
        icon={<Dashboard />}
        linkUri="/dashboard"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Portfolio"
        icon={<PieChart />}
        linkUri="/portfolio"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Bots"
        icon={<Timeline />}
        linkUri="/bots"
      ></SidebarActionItem>

      <SidebarSpacer />

      <SidebarActionItem
        text="Settings"
        icon={<Settings />}
        linkUri="/settings"
      ></SidebarActionItem>
    </SidebarContainer>
  );
};
