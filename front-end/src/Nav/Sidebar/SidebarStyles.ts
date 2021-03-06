import { BottomNavigation, Card, Drawer, SwipeableDrawer } from "@material-ui/core";
import { Polymer } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IViewType } from "../../../../types";
import {
  BaseSvg,
  BaseText,
  CenteredFlexBox,
  ClickableDiv,
  ClickableSvg,
  FadeoutAnimation,
  SvgWrapperButton,
  TimingStyle,
} from "../../GlobalStyles";
import { COLORS, RD, SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { ArrowIcon } from "../../_components";

interface IDesktopWrapperProps {
  isSidebarCollapsed: Boolean;
}

export const SidebarSpacer = styled.div`
  height: 100%;
`;

export const AlgonexLogo = styled(Polymer)`
  fill: ${COLORS.primaryBase} !important;
`;

export const SidebarContainer = styled.div<IDesktopWrapperProps>`
  display: flex;
  justify-content: start;
  box-shadow: 5px 10px 25px -24px;
  overflow: hidden;
  flex-direction: column;
  position: sticky;
  top: 0;
  background-color: ${COLORS.darkBase};
  flex-shrink: 0;
  height: 100vh;
  * {
    color: white;
  }
  width: ${(props: any) =>
    props.isSidebarCollapsed ? SPACING.NavbarHeight : SPACING.sidebarWidth};

  align-items: ${(props: any) =>
    props.isSidebarCollapsed ? "center" : "start"};
  z-index: 1;
  ${TimingStyle}
`;

export const SidebarActionArea = styled.div`
  margin: 0;
  padding: 0;
`;

export const SidebarDrawer = styled(SwipeableDrawer)`
  display: flex;
  justify-content: start;
  box-shadow: 5px 10px 25px -24px;
  flex-direction: column;
  height: 100vh;
  width: ${SPACING.sidebarWidth};
  align-items: start;
  ${TimingStyle}
`;

export const LinkWrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
  flex-wrap: none;
`;

interface ILinkTextProps {
  isVisible?: boolean;
}
export const LinkText = styled(BaseText)<ILinkTextProps>`
  font-size: 1.2em;
  display: flex;
  margin-left: ${SPACING.NavbarHeight};
  cursor: pointer;
  align-items: center;
  height: 100%;
`;

export const SidebarTab = styled(ClickableDiv)`
  display: flex;
  width: 100%;
  height: ${SPACING.NavbarHeight};
`;

interface ITabContentContainerProps {
  isActiveTab: boolean;
}
export const TabSubContentContainer = styled.div<ITabContentContainerProps>`
  ${TimingStyle}
  ${(props) => (props.isActiveTab ? `height: 200px;` : `height: 0px;`)}
  background-color: ${COLORS.primaryLight3};
  width: 100%;
`;
export const SidebarIconContainer = styled.div<ITabContentContainerProps>`
  height: 100%;
  padding: 1em;
  svg {
    ${(props) => props.isActiveTab && `fill: ${COLORS.accentBase};`}
  }
  width: ${SPACING.NavbarHeight};
  position: absolute;
  ${CenteredFlexBox}
`;
export const SidebarDetailsButton = styled(SvgWrapperButton)``;

export const BottomNavbar = styled(BottomNavigation)`
  width: 100%;
  position: fixed;
  bottom: 0px;
  background-color: #2e2e2e;
  *{
    color: white !important;
  }

`;
