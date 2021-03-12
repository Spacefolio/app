import styled from "styled-components";
import { COLORS, RD, SPACING } from "../../../_styles/ResponsiveDesign";
import { BaseGrid, CenteredFlexBox, ClickableDiv } from "../../../_styles";
import { Paper } from "@material-ui/core";

export const PortfolioCharts = styled(BaseGrid)`
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
