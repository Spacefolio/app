import {
  Card,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { style } from "d3";
import styled from "styled-components";
import {
  BaseSearchBar,
  BaseSvg,
  CenteredFlexBox,
  ClickableDiv,
  ClickableSvg,
  FlexCard,
  TimingStyle,
} from "../GlobalStyles";
import { COLORS, SPACING } from "../GlobalStyles/ResponsiveDesign";

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
  ${(props) =>
    props.selected
      ? `border-left: 3px solid ${COLORS.accentBase};`
      : `margin-left: 3px;`}
`;

export const MyExchangeEditAreaWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const MyExchangeNameWrapper = styled(ListItemText)``;

export const ExchangeFormContainer = styled.form`
  position: relative;
`;

export const AddExchangeWrapper = styled.div`
  width: 100%;
`;

export const ExchangeSearchBar = styled(BaseSearchBar)`
    
`;

export const ModifyContainer = styled(ListItemSecondaryAction)`
  ${CenteredFlexBox}
`;

export const AddExchangeItem = styled(Card)` 
  width: 12rem;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 5px;
  padding: .5rem;
  border: solid white 3px;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  &:hover {
    border: solid black 3px;
  }
  ${TimingStyle};
`;

export const AddExchangeGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-height: 400px;
  min-width: 300px;
  min-height: 400px;
`;
