import { Polymer } from "@material-ui/icons";
import styled from "styled-components";
import {
  CenteredFlexBox,
  ClickableDiv,
  ClickableSvg,
  FadeoutAnimation,
  SvgWrapperButton,
  TimingStyle,
} from "../../AlgonexStyles";
import { COLORS, RD, SPACING } from "../../AlgonexStyles/ResponsiveDesign";

export const SidebarSpacer = styled.div`
  height: 100%;
`;

interface ISidebarContainerProps {
  isSidebarCollapsed: boolean;
}
export const SidebarContainer = styled.div<ISidebarContainerProps>`
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

export const LinkWrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: start;
  flex-wrap: none;
`;

export const LinkText = styled.div`
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
