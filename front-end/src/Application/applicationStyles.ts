import styled from "styled-components";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";
import {
  CenteredFlexBox,
  ResizeTransition,
  TimingStyle,
} from "../GlobalStyles";

interface ApplicationProps {
  viewType: "mobile" | "desktop";
  width: number;
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: ${SPACING.NavbarHeight};
  padding: 0 ${SPACING.flexCardGap};
  height: calc(${(props) => window.innerHeight}px - ${SPACING.NavbarHeight});
  @media only screen and (max-width: ${RD.breakpointsmartphone}) {
    height: ${(props) => window.outerHeight}px;
    padding: 0;
  }
`;

export const ApplicationFlexContainer = styled.div`
  width: 100%;
  ${TimingStyle}
`;
export const BodyWrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
`;
