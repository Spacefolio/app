import styled from "styled-components";
import { RD } from "../../Application/ResponsiveDesign";

export const DesktopContainer = styled.div`
  font-weight: 500;
  font-size: 1em;
  display: flex;
  justify-content: start;
  overflow: hidden;
  flex-direction: column;
  left: 0px;
  z-index: 2;
  background-color: white;
  flex-shrink: 0;
  height: 100vh;
  @media screen and (max-width: ${RD.breakpointtablet}) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  font-weight: 500;
  font-size: 1em;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  width: 300px;
  background-color: white;
  height: 100vh;
`;

export const MobileBlurWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: ${RD.breakpointtablet}) {
    display: none;
  }
`;
export const LinkWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 20px 8px;
`;

export const LinkText = styled.div`
  cursor: pointer;
  padding-left: 30px;
  height: 100%;
`;
