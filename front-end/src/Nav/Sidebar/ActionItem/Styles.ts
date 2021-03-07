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
  align-items: center;
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

  ${CenteredFlexBox}
`;
