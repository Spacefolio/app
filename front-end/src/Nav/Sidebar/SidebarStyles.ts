import { Card, Drawer, SwipeableDrawer } from "@material-ui/core";
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

export const SidebarContainer = styled.div<IDesktopWrapperProps>`
  display: flex;
  justify-content: start;
  box-shadow: 5px 10px 25px -24px;
  overflow: hidden;
  flex-direction: column;
  background-color: ${COLORS.primaryLight4};
  flex-shrink: 0;
  height: 100%;
  width: ${(props: any) =>
    props.isSidebarCollapsed ? SPACING.NavbarHeight : SPACING.sidebarWidth};

  @media (max-width: ${RD.breakpointtablet}) {
    ${(props) =>
      `position: fixed; width: ${
        props.isSidebarCollapsed ? "0px" : SPACING.sidebarWidth
      };`}
  }

  align-items: ${(props: any) =>
    props.isSidebarCollapsed ? "center" : "start"};
  z-index: 1;
  padding-top: ${SPACING.NavbarHeight};
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
  background-color: ${COLORS.primaryLight4};
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
  color: black;
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
  ${(props) => (props.isActiveTab ? `height: 300px;` : `height: 0px;`)}
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
