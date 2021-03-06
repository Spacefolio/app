import React from "react";
import { AlgonexLogo, SidebarActionArea, SidebarContainer, SidebarSpacer } from "./SidebarStyles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { SidebarActionItem } from "./NavSections";
import { ExchangeSidebarFilter } from "./ExchangeSidebarFilter";
import { Dashboard, Extension, PieChart, Polymer, Settings, Timeline } from "@material-ui/icons";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import { AddNewExchangeList } from "../../Exchanges";
import { RD, SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { Avatar } from "@material-ui/core";
import useMedia from "use-media";

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

      {/* <SidebarActionItem
        text="Integrations"
        icon={<Extension />}
        linkUri="/bots"
      ></SidebarActionItem> */}

      <SidebarSpacer/>

      <SidebarActionItem
        text="Settings"
        icon={<Settings />}
        linkUri="/settings"
      ></SidebarActionItem>
    </SidebarContainer>
  );
};
