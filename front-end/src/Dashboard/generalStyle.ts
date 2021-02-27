import styled from "styled-components";
import {RD, SPACING} from '../GlobalStyles/ResponsiveDesign' 

export const DashboardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: ${SPACING.flexCardGap};
  margin-top: 8px;
  @media screen and (min-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one one"
      "two three"
      "five four";
  }

  @media screen and (max-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one"
      "two"
      "three"
      "four"
      "five";
  }
`;
