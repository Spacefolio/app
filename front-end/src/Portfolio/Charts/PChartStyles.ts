import styled from "styled-components";
import { COLORS, RD, SPACING } from "../../AlgonexStyles/ResponsiveDesign";
import { BaseGrid, CenteredFlexBox, ClickableDiv } from "../../AlgonexStyles";
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

interface ITimeFrameItemProps {
  selected: boolean;
}
export const TimeframeItem = styled(ClickableDiv)<ITimeFrameItemProps>`
  padding: 1rem;
  min-width: 50px;
  max-width: 50px;
  ${CenteredFlexBox}
  ${(props) =>
    props.selected
      ? `color: ${COLORS.accentBase}`
      : ``}
`;
