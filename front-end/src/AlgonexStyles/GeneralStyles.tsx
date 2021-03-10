import { Link, NavLink } from "react-router-dom";
import React from "react";
import { COLORS, TIMING } from "./ResponsiveDesign";
import styled from "styled-components";
import { Polymer } from "@material-ui/icons";
import { Button } from "@material-ui/core";
export const TimingStyle = `
transition: ${TIMING.transitionTime};
`;
export const CenteredFlexBox = `
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const BaseSvg = styled.svg``;

export const BaseDiv = styled.div`
  position: relative;
  cursor: pointer;
  * {
    cursor: pointer;
  }
`;

export const ClickableDiv = styled(BaseDiv)`
  &:hover {
    color: ${COLORS.accentBase};
    svg {
      fill: ${COLORS.accentBase};
    }
  }
  ${TimingStyle}
`;
export const ClickableSvg = styled(BaseSvg)`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  &:hover {
    fill: ${COLORS.accentBase};
  }
  ${TimingStyle}
`;
export const Scrollbox = styled.div`
  overflow-y: auto;
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
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 6px 6px 14px #e3e3e8;
  overflow: hidden;
  ${TimingStyle};
`;
export const BaseSearchBar = styled.input`
  cursor: pointer
  border-radius: 3px;
  border: ${COLORS.primaryBase} solid 1px;
  width: 100%;
  padding: 1rem;
  &:focus {
  }
`;
export const BigWideButton = styled.button`
  ${CenteredFlexBox}
  width: 100%;
  border-radius: 1rem;
  background-color: ${COLORS.primaryBase};
  padding: 1rem;
  color: white;
  box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
  cursor: pointer;
  ${TimingStyle}
  &:hover {
    background-color: ${COLORS.accentBase};
    box-shadow: 0px 15px 25px -17px ${COLORS.accentBase};
  }
`;

export const BaseButton = styled(Button)`
  box-shadow: 0px 15px 25px -17px ${COLORS.primaryBase};
  width: 120px;
  padding: 10 10px;
  border-radius: 20px;
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

interface InlineDivProps {
  align?: "start" | "flex-end";
}
export const InlineDiv = styled.div<InlineDivProps>`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.align};
`;

export const SvgWrapperButton = styled(ClickableDiv)`
  height: 2rem;
  width: 2rem;
  ${CenteredFlexBox}
`;
export const FlexWrap = styled(InlineDiv)`
  white-space: none;
  flex-wrap: wrap;
  gap: 5px;
`;

export const AlgonexLogo = styled(Polymer)`
  height: 100%;
  width: 100%;
  fill: ${COLORS.primaryBase} !important;
`;