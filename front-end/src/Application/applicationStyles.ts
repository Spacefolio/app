import styled from "styled-components";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";
import { CenteredFlexBox, ResizeTransition, TimingStyle } from "../GlobalStyles";

interface ApplicationProps {
  viewType: "mobile" | "desktop";
}

export const ApplicationContainer = styled.div<ApplicationProps>`
  display: flex;
  justify-content: center;
  height: ${(props) =>
    props.viewType == "desktop" ? "calc(100vh - 57px)" : "calc(100vh - 134px)"};
  width: 100%;
  margin: 0 ${SPACING.flexCardGap};
`;

export const ApplicationFlexContainer = styled.div`
  width: 100%;
  ${TimingStyle}
`;
export const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
