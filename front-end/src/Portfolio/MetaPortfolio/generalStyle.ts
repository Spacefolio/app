import styled from "styled-components";
import { RD } from "../../GlobalStyles/ResponsiveDesign";

export const MetaPortfolioWrapper = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const MetaPortfolioChartWrapper = styled.div``;

export const SyncAreaContainer = styled.div`
  display: flex;
`;

export const SyncButtonContainer = styled.div`
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 80px;
`;

export const PortfolioValueWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PortfolioValueChangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PortfolioValueItem = styled.div`
  padding: 5px 10px;
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
