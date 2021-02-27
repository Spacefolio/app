import styled from "styled-components";
import { RD, SPACING } from "../GlobalStyles/ResponsiveDesign";

export const PortfolioWrapper = styled.div`
  padding: 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
export const PortfolioSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const PortfolioSidebarWrapper = styled.div`
  display: block;
  width: 300px;
  height: 100%;
  margin: 20px;
  // margin-right: ${SPACING.flexCardGap};
`;
export const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
export const TabItem = styled.div`
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
`;

export const TableLineItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 10px;
  background-color: white;
  border-bottom: 1px solid black;
`;

export const LineItemAttrWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
`;

export const DataLabelsContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  color: darkgrey;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
`;

export const DataLabelItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
`;