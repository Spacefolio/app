import React from "react";
import { DesktopContainer } from "./SidebarStyles";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../_reducers";
import { DesktopSidebar } from "./Desktop";
import { MobileSidebar } from "./Mobile";

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
    <React.Fragment>
      {viewType == "mobile" ? <MobileSidebar /> : <DesktopSidebar />}
    </React.Fragment>
  );
};
