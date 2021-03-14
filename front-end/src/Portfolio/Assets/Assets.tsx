import React, { useState } from "react";
import { AssetItem } from "./Line_item/AssetItem";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../types";
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
import { TableCellStyled } from "../Filter/Styles";

interface IHoldingsProps {
  portfolioItems: IPortfolioItemView[];

}

export const Assets: React.FC<IHoldingsProps> = ({ portfolioItems }) => {
  const [filterField, setFilterField] = useState("value");
  const [sortAscending, setSortAscending] = useState(false);

  const sortHoldings = (field: string, ascending: boolean) => {
    return portfolioItems.sort((a: any, b: any) =>
      ascending ? a[field].USD - b[field].USD : b[field].USD - a[field].USD
    );
  };

  return (
    <div style={{ gridArea: "holdings" }}>
      {portfolioItems ? (
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
                return <AssetItem portfolioItem={pItem} />;
              }
            )}
          </TableBody>
        </Table>
      ) : (
        <ViewLoading />
      )}
    </div>
  );
};
