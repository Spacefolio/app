import {
  Card,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { style } from "d3";
import styled from "styled-components";
import { BaseSearchBar, CenteredFlexBox } from "../../_styles";


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

export const MyExchangesListContainer = styled(List)`
  width: 100%;
`;

interface MyExchangeLineItemProps {
  selected: boolean;
}

export const MyExchangesLineItemContainer = styled(
  ListItem
)<MyExchangeLineItemProps>`
  font-size: 1rem;
  position: relative;
`;

export const MyExchangeEditAreaWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ExchangeFormContainer = styled.form`
  position: relative;
`;

export const AddExchangeWrapper = styled.div`
  width: 100%;
`;

export const ExchangeSearchBar = styled(BaseSearchBar)``;

export const ModifyContainer = styled(ListItemSecondaryAction)`
  ${CenteredFlexBox}
`;