import { style } from "d3";
import styled from "styled-components";
import { BaseSearchBar } from "../GlobalStyles";
import { COLORS } from "../GlobalStyles/ResponsiveDesign";

export const MyExchangesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

export const MyExchangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MyExchangesListContainer = styled.div``;

interface MyExchangeLineItemProps {
  selected: boolean;
}

export const MyExchangesLineItemContainer = styled.div<MyExchangeLineItemProps>`
  width: 100%;
  padding: 10px 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${(props) =>
    props.selected
      ? `border-left: 3px solid ${COLORS.primaryBase};`
      : `margin-left: 3px;`}
`;

export const MyExchangeEditAreaWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const MyExchangeNameWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 0;
  flex-wrap: none;
`;

export const ExchangeFormContainer = styled.form`
  position: relative;
`;

export const AddExchangeWrapper = styled.div``;

export const ExchangeSearchBar = styled(BaseSearchBar)`

`;
