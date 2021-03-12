import { Card } from "@material-ui/core";
import styled from "styled-components";
import { COLORS } from "../../_styles/ResponsiveDesign";

export const DDWrapper = styled(Card)`
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  z-index: 6;
  top: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: ${COLORS.primaryLight4};
`;

export const DDList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const DDListItem = styled.div`
  cursor: pointer;
  color: ${COLORS.primaryDark3};
  padding: 10px;
  width: 100%;
  &:hover {
    color: ${null};
    background-color: ${null};
  }
`;
