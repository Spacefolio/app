import styled from "styled-components";
import {
  BaseDiv,
  CenteredFlexBox,
  ClickableDiv,
  InlineDiv,
} from "../../AlgonexStyles";
import { COLORS, RD, SPACING } from "../../AlgonexStyles/ResponsiveDesign";

export const MetaPortfolioWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: ${SPACING.flexCardGap};
`;

export const MetaPortfolioChartWrapper = styled.div`
  ${CenteredFlexBox}
  height: 100%;
`;

export const SyncButtonContainer = styled(ClickableDiv)`
  ${CenteredFlexBox}
`;

export const PortfolioValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 100px;
  padding: 1rem 10%;
  width: 100%;
`;

export const PortfolioProfitContainer = styled.div`
  ${CenteredFlexBox}
`;

interface Props {
  value: number;
}
export const PortfolioProfitSection = styled(InlineDiv)<Props>`
  ${(props) =>
    props.value > 0
      ? `color: ${COLORS.accentBase};`
      : ` color: ${COLORS.errorBase};`}
`;

export const PortfolioName = styled(BaseDiv)`
  color: black;
  position: relative;
  white-space: nowrap;
  font-size: 2rem;
  font-weight: 500;
`;

export const PortfolioValueColumn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  // border: 1px solid black;
  justify-content: space-evenly;
  align-items: start;
`;

export const MetaPortfolioTimeframeSelector = styled(ClickableDiv)`
  display: flex;
  align-items: center;
  justify-items: center;
`;
