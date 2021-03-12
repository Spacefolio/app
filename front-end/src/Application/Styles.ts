import styled from "styled-components";
import { RD, SPACING } from "../_styles/ResponsiveDesign";
import {
  CenteredFlexBox,
  ResizeTransition,
  TimingStyle,
} from "../_styles";
import { IViewType } from "../../../types";

interface ApplicationProps {
  isSidebarCollapsed: boolean;
  isMobile: boolean;
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: ${(props) => {
    if (props.isSidebarCollapsed) {
      return `calc(100% - ${SPACING.NavbarHeight});`;
    } else {
      return `calc(100% - ${SPACING.sidebarWidth});`;
    }
  }};
  ${(props) =>
    props.isMobile &&
    !props.isSidebarCollapsed &&
    "opacity: .2;"}
  height: 100%;
  @media (max-width: ${RD.breakpointsmartphone}) {
    width: 100%;
  }
  ${TimingStyle}
`;

export const ApplicationFlexContainer = styled.div<ApplicationProps>`
  padding: 0 ${SPACING.flexCardGap};
  width: 100%;
  height: 100%;
  max-width: ${RD.widthlaptop};
  ${TimingStyle}
`;
export const BodyWrapper = styled.div`
  background: #f3f3f3;
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
`;
