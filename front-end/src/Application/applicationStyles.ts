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
  viewType: IViewType;
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  height: 100%;
  @media only screen and (max-width: ${RD.breakpointsmartphone}) {
    height: ${window.outerHeight}px;
    padding: 0;
  }
  ${TimingStyle}
`;

export const ApplicationFlexContainer = styled.div`
  width: 100%;

  ${TimingStyle}
`;
export const BodyWrapper = styled.div`
  display: flex;
  position: relative;

  width: 100%;
`;
