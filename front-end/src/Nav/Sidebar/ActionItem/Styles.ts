import { BaseDiv } from "./../../../AlgonexStyles/GeneralStyles";
import styled from "styled-components";
import {
  CenteredFlexBox,
  ClickableDiv,
  COLORS,
  SPACING,
  TimingStyle,
} from "../../../AlgonexStyles";

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
  display: flex;
  margin-left: ${SPACING.NavbarHeight};
  align-items: center;
`;

export const SidebarTab = styled(BaseDiv)<ITabContentContainerProps>`
  display: flex;
  width: 100%;
  height: ${SPACING.sidebarHeight};
  ${(props) =>
    props.isActiveTab &&
    !props.Branding &&
    `box-shadow: inset 3px 0 0 0 ${COLORS.accentBase}; background: #3d3d3d;`}
  * {
    ${(props) =>
      props.isActiveTab &&
      !props.Branding &&
      `fill: ${COLORS.accentBase}; color: ${COLORS.accentBase};  background: #3d3d3d;`}
  }
  ${(props) =>
    props.Branding && `height: ${parseInt(SPACING.sidebarHeight) * 2}px;`}
  &:hover {
    background: #3d3d3d;
  }
`;

export const SidebarSubTab = styled(BaseDiv)<ITabContentContainerProps>`
  display: flex;
  width: 100%;
  margin-left: 10px;
  color: whitesmoke;
  height: calc(${SPACING.NavbarHeight} - 15px);
  ${(props) =>
    props.isActiveTab &&
    !props.Branding &&
    `box-shadow: inset 3px 0 0 0 ${COLORS.accentBase}; background: #3d3d3d;`}
  * {
    ${(props) =>
      props.isActiveTab &&
      !props.Branding &&
      `fill: ${COLORS.accentBase}; background: #3d3d3d;`}
  }
  &:hover {
    background: #3d3d3d;
  }
`;

interface ITabContentContainerProps {
  isActiveTab: boolean;
  Branding?: boolean;
}
export const TabSubContentContainer = styled.div<ITabContentContainerProps>`
  ${TimingStyle}
  display: ${(props) => (props.isActiveTab ? "block" : "none")};
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100%;
`;

export const SidebarIconContainer = styled.div`
  height: 100%;
  padding: 1em;
  position: absolute;
  width: ${SPACING.NavbarHeight};
  background: transparent;
  ${CenteredFlexBox}
`;

export const SidebarDivider = styled.div``;
