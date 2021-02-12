import styled from "styled-components";
import {RD} from '../../Application/ResponsiveDesign' 

export const DashboardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  margin-top: 8px;
  @media screen and (min-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one";
  }

  @media screen and (max-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one";
  }
`;
