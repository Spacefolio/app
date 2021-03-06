import styled from "styled-components";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";
import {
  CenteredFlexBox,
  ResizeTransition,
  TimingStyle,
} from "../GlobalStyles";
import { IViewType } from "../../../types";

interface ApplicationProps {
  isSidebarCollapsed: boolean;
  isMobile: boolean;
}

function sidebarWidthCalculator(
  width: string,
  isMobile: boolean,
  isSidebarCollapsed: boolean
) {
  const widthNum: number = parseInt(width);
  if (isMobile) {
    return widthNum;
  } else {
    if (isSidebarCollapsed) {
      return widthNum - parseInt(SPACING.NavbarHeight);
    } else {
      return widthNum - parseInt(SPACING.sidebarWidth);
    }
  }
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;

  flex-direction: column;
  width: ${(props) => {
    if (props.isSidebarCollapsed) {
      return `calc(100% - ${SPACING.NavbarHeight});`;
    } else {
      return `calc(100% - ${SPACING.sidebarWidth});`;
    }
  }};
  height: 100%;
  @media (max-width: ${RD.breakpointsmartphone}) {
    width: 100%;
  }
  ${TimingStyle}
`;

export const ApplicationFlexContainer = styled.div<ApplicationProps>`
  overflow-x: hidden;
  padding: ${(props) => (props.isMobile ? "0;" : "1rem")};
  width: 100%;
  max-width: ${RD.widthmonitor};
  ${TimingStyle}
`;
export const BodyWrapper = styled.div`
  display: flex;
  position: relative;

  width: 100%;
`;
