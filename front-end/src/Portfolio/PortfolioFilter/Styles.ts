import { TableCell, TableRow } from "@material-ui/core";
import styled from "styled-components";
import { TimingStyle } from "../../AlgonexStyles";

export const FilterWrapper = styled.div`
  margin: 10px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
`;

export const FilterSection = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-content: center
  width: 100%;
`;

export const DateLabel = styled.div`
  padding: 10px;
`;

export const TableRowStyled = styled(TableRow)`
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0px 10px 25px -24px;
  ${TimingStyle};
`;
export const TableCellStyled = styled(TableCell)`
  padding: .5rem;
  ${TimingStyle};
`;
