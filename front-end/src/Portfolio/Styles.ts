import { Tab, Tabs } from "@material-ui/core";
import styled from "styled-components";
import { RD, SPACING } from "../AlgonexStyles/ResponsiveDesign";

export const PortfolioWrapper = styled.div`
  padding: ${SPACING.flexCardGap} 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.flexCardGap};
`;

export const StyledTabs = styled(Tabs)``;

export const StyledTab = styled(Tab)`
  padding: 0 50px;
`;
