import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IViewType } from "../../../../types";
import {
  CenteredFlexBox,
  ClickableSvg,
  TimingStyle,
} from "../../GlobalStyles";
import { COLORS, SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { LinkText } from "../Sidebar/SidebarStyles";

export const MobileContainer = styled.div`
  border-top: 3px solid ${COLORS.primaryBase};
  background-color: ${COLORS.primaryLight4};
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: ${SPACING.NavbarHeight};
  ${CenteredFlexBox}
`;

export const NavTab = styled(NavLink)`
  ${CenteredFlexBox}
  width: 100%;
  height: 100%;
  color: ${COLORS.primaryBase};
  ${TimingStyle}
  &:hover {
    ${ClickableSvg} {
      fill: orange;
    }
  }
  border-bottom: 1px black solid;
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
