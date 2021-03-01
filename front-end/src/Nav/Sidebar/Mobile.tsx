import React from "react";
import {
  BotsIcon,
  PortfolioIcon,
  DashboardIcon,
} from "../../_components/Icons";
import { useDispatch, useSelector } from "react-redux";
import { MobileContainer, NavTab, SidebarIconContainer } from "./SidebarStyles";
import { IRootState } from "../../_reducers";
import { BotSection, DashboardSection, PortfolioSection } from "./NavSections";
import { ModalBg, ModalWrapper } from "../../_components/Modal/ModalStyles";
import { applicationViewActions } from "../../_actions/applicationView.actions";

interface BottomNavProps {}

export const MobileSidebar: React.FC<BottomNavProps> = ({}) => {
  const dispatch = useDispatch();

  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  const isSidebarVisible = useSelector(
    (state: IRootState) => state.applicationView.isSidebarVisible
  );

  return (
    <ModalWrapper>
      <MobileContainer isSidebarVisible={isSidebarVisible}>
        {DashboardSection(isSidebarVisible, viewType)}
        {PortfolioSection(isSidebarVisible, viewType)}
        {BotSection(isSidebarVisible, viewType)}
      </MobileContainer>
      {!isSidebarVisible && <ModalBg onMouseDown={() => dispatch(applicationViewActions.toggleSidebar('mobile'))}></ModalBg>}
    </ModalWrapper>
  );
};
