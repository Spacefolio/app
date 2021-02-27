import { Link } from "react-router-dom";
import styled from "styled-components";
import { TIMING } from "./ResponsiveDesign";
export const TimingStyle = `
transition: ${TIMING.transitionTime};
`;
export const CenteredFlexBox = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BaseSvg = styled.svg`
  fill: black;
`;
export const ClickableDiv = styled.div`
  cursor: pointer;
  ${TimingStyle}
`;
export const ClickableSvg = styled(BaseSvg)`
  ${TimingStyle}
  &:hover {
    fill: var(--accent-base);
  }
`;
export const Scrollbox = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;
export const FlexCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 20px;
`;
export const BasicSearchBar = styled.input`
  border-radius: 5px;
  border: lightblue solid 3px;
  width: 100%;
  padding: 10px;
  &:focus {
  }
`;
export const BasicButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: var(--primary-base);
  padding: 10px;
  color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  ${TimingStyle}
  &:hover {
    background-color: var(--accent-base);
  }
`;
export const FullScreenOverlay = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top 0;
  bottom: 0;
  margin: 50%;
`;
export const BasicLink = styled(Link)`
  color: var(--primary-base);
  ${TimingStyle}
`;
