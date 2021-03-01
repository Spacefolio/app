import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS, TIMING } from "./ResponsiveDesign";
export const TimingStyle = `
transition: ${TIMING.transitionTime};
`;
export const CenteredFlexBox = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BaseSvg = styled.svg`
  fill: ${COLORS.primaryDark2};
`;
export const ClickableDiv = styled.div`
  cursor: pointer;
  ${TimingStyle}
`;
export const ClickableSvg = styled(BaseSvg)`
  width: 100%;
  height: 100%;
  cursor: pointer;
  ${TimingStyle}
  &:hover {
    fill: ${COLORS.accentBase};
  }
`;
export const BaseText = styled.div`
  ${TimingStyle}
`;
export const Scrollbox = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;
export const BaseGrid = styled.div`
  display: grid;
  ${TimingStyle}
`;
export const FlexCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 20px;
  box-shadow: 0px 10px 25px -24px;
  ${TimingStyle};
`;
export const BaseSearchBar = styled.input`
  border-radius: 5px;
  border: lightblue solid 3px;
  width: 100%;
  padding: 10px;
  &:focus {
  }
`;
export const BaseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${COLORS.primaryBase};
  padding: 10px;
  color: white;
  box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
  cursor: pointer;
  ${TimingStyle}
  &:hover {
    background-color: ${COLORS.accentBase};
    box-shadow: 0px 15px 25px -17px ${COLORS.accentBase};
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
export const BaseLink = styled(Link)`
  color: ${COLORS.primaryBase};
  ${TimingStyle}
`;
export const SvgWrapActionButton = styled(ClickableDiv)`
  height: 50px;
  width: 50px;
  padding: 10px;
  border: 3px solid ${COLORS.primaryBase};
  border-radius: 10px;
  &:hover {
    border: ${COLORS.accentBase} 3px solid;
    ${ClickableSvg} {
      fill: ${COLORS.accentBase};
    }
  }
`;
