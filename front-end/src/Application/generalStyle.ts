import styled from "styled-components";
import { RD } from "./ResponsiveDesign";

export const ApplicationContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  padding: 0 8px;
  background-color: var(--primary-light3);
`;

export const ApplicationFlexContainer = styled.div`
width: 1920px;
  @media screen and (max-width: ${RD.breakpointmonitor}) {
    width: ${RD.breakpointlaptop};
  }
  @media screen and (max-width: ${RD.breakpointlaptop}) {
    width: ${RD.widthtablet};
  }
  @media screen and (max-width: ${RD.breakpointtablet}) {
    width: ${RD.widthsmartphone};
  }
`;
