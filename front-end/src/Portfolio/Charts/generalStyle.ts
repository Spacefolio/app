import styled from "styled-components";
import { RD, SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { CenteredFlexBox } from "../../GlobalStyles";

export const DashboardWrapper = styled.div`
  width: 100%;
  display: grid;
  gap: ${SPACING.flexCardGap};
  @media screen and (min-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one one"
      "two three";
  }

  @media screen and (max-width: ${RD.breakpointtablet}) {
    grid-template-areas:
      "one"
      "two"
      "three";
  }
`;

export const TimeFrameSelectorContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

interface ITimeFrameItemProps {
  selected: boolean;
}
export const TimeframeItem = styled.div<ITimeFrameItemProps>`
  padding: 5px;
  min-width: 50px;
  max-width: 50px;
  ${CenteredFlexBox}
  ${(props) =>
    props.selected
      ? "border: 3px solid var(--accent-base); border-radius: 5px;"
      : `margin: 3px;`}
`;
