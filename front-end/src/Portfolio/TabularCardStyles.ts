import styled from "styled-components";
import { RD } from "../Application/ResponsiveDesign";

export const LabelWrapper = styled.div`
  width: 100%;
  color: darkgrey;
`;

export const DataWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  flex-direction: column;
`;

export const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  @media (min-width: ${RD.breakpointtablet}) {
    display: none;
  }
  align-items: center;
`;

export const DesktopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;

  @media (max-width: ${RD.breakpointtablet}) {
    display: none;
  }
`;

export const FixedInline = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: none;
`;
