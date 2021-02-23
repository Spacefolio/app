import styled from "styled-components";
import {RD} from '../../Application/ResponsiveDesign'

export const DashboardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  padding-top: 8px;
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

