import React from "react";
import { SidebarActionArea, SidebarContainer } from "./SidebarStyles";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { SidebarActionItem } from "./NavSections";
import { ExchangeSidebarFilter } from "./ExchangeSidebarFilter";
import { Dashboard, Extension, PieChart, Timeline } from "@material-ui/icons";
import { applicationViewActions } from "../../_actions/applicationView.actions";
import { AddNewExchangeList } from "../../Exchanges";

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = ({}) => {
  const dispatch = useDispatch();

  const isSidebarCollapsed = useSelector(
    (state: IRootState) => state.applicationView.isSidebarCollapsed
  );
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );
  const width = useSelector(
    (state: IRootState) => state.applicationView.applicationContainerWidth
  );

  return (
    <SidebarContainer isSidebarCollapsed={isSidebarCollapsed}>
      <SidebarActionItem
        text="Dashboard"
        icon={<Dashboard />}
        linkUri="/dashboard"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Portfolio"
        icon={<PieChart />}
        linkUri="/portfolio"
      >
        <ExchangeSidebarFilter />
      </SidebarActionItem>

      <SidebarActionItem
        text="Bots"
        icon={<Timeline />}
        linkUri="/bots"
      ></SidebarActionItem>

      <SidebarActionItem
        text="Integrations"
        icon={<Extension />}
        linkUri="/bots"
      ></SidebarActionItem>
    </SidebarContainer>
  );
};
