import React, { useState } from "react";
import { HoldingItem } from "./HoldingItem/HoldingItem";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { ILabelObject, LabelSorter } from "../Transactions/LabelSorter";
import { SPACING } from "../../GlobalStyles/ResponsiveDesign";
import { IRootState } from "../../_reducers";
import { FlexCard, GrowFromZero } from "../../GlobalStyles";
import { ViewLoading } from "../../_components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { TableCellStyled } from "../PortfolioFilter/Filter/FilterStyles";

export const Holdings = () => {
  const dispatch = useDispatch();

  const portfolioData: IPortfolioDataView = useSelector(
    (state: IRootState) => state.portfolio.filteredPortfolioData
  );

  const [filterField, setFilterField] = useState("value");
  const [sortAscending, setSortAscending] = useState(true);

  const sortHoldings = (field: string, ascending: boolean) => {
    return portfolioData.portfolioItems.sort((a: any, b: any) =>
      ascending ? a[field] - b[field] : b[field] - a[field]
    );
  };

  return (
    <React.Fragment>
      {portfolioData ? (
        <Paper>
          <GrowFromZero in={true}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCellStyled>Asset</TableCellStyled>
                  <TableCellStyled align="right">Amount</TableCellStyled>
                  <TableCellStyled align="right">Price</TableCellStyled>
                  <TableCellStyled align="right">Value</TableCellStyled>
                  <TableCellStyled align="right">Profit</TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortHoldings(filterField, sortAscending).map(
                  (pItem: IPortfolioItemView) => {
                    return <HoldingItem portfolioItem={pItem} />;
                  }
                )}
              </TableBody>
            </Table>
          </GrowFromZero>
        </Paper>
      ) : (
        <ViewLoading />
      )}
    </React.Fragment>
  );
};
