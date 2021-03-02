import styled from "styled-components";
import { CenteredFlexBox, ClickableDiv } from "../../GlobalStyles";
import { COLORS, RD } from "../../GlobalStyles/ResponsiveDesign";

export const MetaPortfolioWrapper = styled.div`
  padding: 1rem 0;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const MetaPortfolioChartWrapper = styled.div`
  ${CenteredFlexBox}
  height: 100%;
`;

export const SyncButtonContainer = styled(ClickableDiv)`
  border-radius: 1rem;
  padding: 1rem;
  opacity: 0.8;
  ${CenteredFlexBox}
  border: 3px solid ${COLORS.primaryBase};
  width: 90px;
  &:hover {
    border: 3px solid ${COLORS.accentBase};
    color: ${COLORS.accentBase};
    svg {
      fill: ${COLORS.accentBase};
    }
    color: ${COLORS.accentBase};
  }
`;

export const PortfolioValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PortfolioValueChangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PortfolioValueItem = styled.div``;

export const PortfolioValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MetaPortfolioTimeframeSelector = styled(ClickableDiv)`
  display: flex;
  align-items: center;
  justify-items: center;
`;
