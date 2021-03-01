import styled from "styled-components";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";
import {
  CenteredFlexBox,
  ResizeTransition,
  TimingStyle,
} from "../GlobalStyles";

interface ApplicationProps {
  viewType: "mobile" | "desktop";
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;
  justify-content: center;
  height: calc(100vh - ${SPACING.NavbarHeight});
  margin-top: ${SPACING.NavbarHeight};
  padding: 0 ${SPACING.flexCardGap};
  width: 100%;
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