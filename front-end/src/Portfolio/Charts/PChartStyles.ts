import styled from "styled-components";
import { COLORS, RD, SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { BaseGrid, CenteredFlexBox } from "../../GlobalStyles";
import { Paper } from "@material-ui/core";

export const DashboardWrapper = styled(BaseGrid)`
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
export const TimeframeItem = styled(Paper)<ITimeFrameItemProps>`
  padding: 5px;
  min-width: 50px;
  max-width: 50px;
  ${CenteredFlexBox}
  ${(props) =>
    props.selected
      ? `border: 3px solid ${COLORS.accentBase}; border-radius: 5px;`
      : `margin: 3px;`}
`;
