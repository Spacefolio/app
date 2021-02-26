import styled from "styled-components";
import { RD } from "./ResponsiveDesign";

export const ApplicationContainer = styled.div`
  display: flex;
  height: calc(100vh - 57px);
  justify-content: center;
  width: 100%;
  padding: 10px;
`;

export const ApplicationFlexContainer = styled.div`
  // width: 100%;
  // max-width: 1920px;
  // @media (max-width: ${RD.breakpointmonitor}) {
  //   width: ${RD.widthlaptop};
  // }
  // @media screen and (max-width: ${RD.breakpointlaptop}) {
  //   width: ${RD.widthtablet};
  // }
  // @media screen and (max-width: ${RD.breakpointtablet}) {
  //   width: ${RD.widthsmartphone};
  // }
`;
export const BodyWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh-57px);
`;
