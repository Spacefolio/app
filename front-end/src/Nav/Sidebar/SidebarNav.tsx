import React from "react";
import { SidebarContainer, SidebarSpacer } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import {
  SidebarActionItem,
  SidebarSubActionItem,
} from "./ActionItem/ActionItem";
import {
  Android,
  Dashboard,
  Help,
  PieChart,
  PieChartOutlined,
  Settings,
  Tab,
  Timeline,
  TrendingUp,
} from "@material-ui/icons";

import { RD } from "../../AlgonexStyles/ResponsiveDesign";

import { useMedia } from "use-media";
import { AlgonexLogo } from "../../AlgonexStyles";
import { Tabs } from "@material-ui/core";
import path from "path";
import { useHistory } from "react-router";
import { ModalWrapper } from "../../_components/Modal/Styles";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = () => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );

  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

  const history = useHistory();

  return (
    <SidebarContainer
      isSidebarCollapsed={isSidebarCollapsed}
      isMobile={isMobile}
      // isFixed={width <= parseInt(RD.breakpointsmartphone) ? true : false}
    >
      <SidebarActionItem
        text="ALGONEX"
        icon={<AlgonexLogo />}
        linkUri="/dashboard"
        Branding={true}
      ></SidebarActionItem>

      <SidebarActionItem
        text="Dashboard"
        icon={<Dashboard />}
        linkUri="/dashboard"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Trade"
        icon={<TrendingUp />}
        linkUri="/trade"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Portfolio"
        icon={<PieChart />}
        linkUri="/portfolio"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Bots"
        icon={<Android />}
        linkUri="/bots"
      ></SidebarActionItem>

      <SidebarSpacer />

      <SidebarActionItem
        text="Help & FAQs"
        icon={<Help />}
        linkUri="/settings"
      ></SidebarActionItem>
      <SidebarActionItem
        text="Settings"
        icon={<Settings />}
        linkUri="/settings"
      ></SidebarActionItem>
    </SidebarContainer>
  );
};
