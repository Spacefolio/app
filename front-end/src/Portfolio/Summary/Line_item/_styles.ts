import styled from "styled-components";
import { SPACING } from "../../../_styles";

export const SummaryWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr 2fr;
  grid-template-areas:
    "name chart"
    "holdings holdings";
`;
