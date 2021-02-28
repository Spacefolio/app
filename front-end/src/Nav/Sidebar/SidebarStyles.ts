import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IViewType } from "../../../../types";
import {
  BaseSvg,
  BaseText,
  CenteredFlexBox,
  ClickableSvg,
  FadeoutAnimation,
  TimingStyle,
} from "../../GlobalStyles";
import { COLORS, RD, SPACING } from "../../GlobalStyles/ResponsiveDesign";

interface IDesktopWrapperProps {
  isSidebarCollapsed: Boolean;
}

export const DesktopContainer = styled.div<IDesktopWrapperProps>`
  font-weight: 500;
  font-size: 1em;
  display: flex;
  justify-content: start;
  width: ${(props: any) => (props.isSidebarCollapsed ? SPACING.NavbarHeight : "300px")};
  align-items: ${(props: any) =>
    props.isSidebarCollapsed ? "center" : "start"};
  box-shadow: 5px 10px 25px -24px;
  overflow: hidden;
  flex-direction: column;
  left: 0px;
  z-index: 1;
  background-color: ${COLORS.primaryLight4};
  flex-shrink: 0;
  height: 100vh;
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

export const NavTab = styled(NavLink)`
  display: flex;
  width: 100%;
  height: ${SPACING.NavbarHeight};
  color: ${COLORS.primaryBase};
  position: relative;
  ${TimingStyle}
  &:hover {
    ${LinkText} {
      color: orange;
    }
    ${ClickableSvg} {
      fill: orange;
    }
  }
`;

interface ITabContentContainerProps {
  viewType: IViewType;
  isActiveTab: boolean;
}
export const TabSubContentContainer = styled.div<ITabContentContainerProps>`
  display: ${(props) => (!props.isActiveTab ? "none" : "null")};
  padding: 10px;
  width: 100%;
`;
export const SidebarIconContainer = styled.div`
  height: 100%;
  padding: 1em;
  width: ${SPACING.NavbarHeight};
  position: absolute;
  ${CenteredFlexBox}
`;
