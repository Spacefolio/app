import styled from "styled-components";
import { CenteredFlexBox, ClickableDiv } from "../../GlobalStyles";
import { COLORS, RD } from "../../GlobalStyles/ResponsiveDesign";

export const MetaPortfolioWrapper = styled.div`
  padding: 10px 0;
  position: relative;

  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const MetaPortfolioChartWrapper = styled.div`
  width: 60%;
  ${CenteredFlexBox}
  height: 100%;
`;

export const SyncButtonContainer = styled(ClickableDiv)`
  border-radius: 10px;
  padding: 8px;
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
  background-color: red;
  width: 20%;
  height: 100%;
`;

export const PortfolioValueChangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PortfolioValueItem = styled.div`
  padding: 0 ;
`;

export const PortfolioValueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MetaPortfolioTimeframeSelector = styled.div`
  padding: 5px;
  border: solid 3px var(--accent-base);
  border-radius: 5px;
`;
