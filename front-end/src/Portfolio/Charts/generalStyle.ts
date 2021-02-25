import styled from "styled-components";
import {RD, SPACING} from '../../Application/ResponsiveDesign'

export const DashboardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: ${SPACING.flexCardGap};
  @media screen and (min-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one one"
      "two three"
  }

  @media screen and (max-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one"
      "two"
      "three"
  }
`;

