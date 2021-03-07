import styled from "styled-components";
import { RD, SPACING } from "../AlgonexStyles/ResponsiveDesign";
import {
  CenteredFlexBox,
  ResizeTransition,
  TimingStyle,
} from "../AlgonexStyles";
import { IViewType } from "../../../types";

interface ApplicationProps {
  isSidebarCollapsed: boolean;
  isMobile: boolean;
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
  height: 100%;
  width: 100%;
`;
