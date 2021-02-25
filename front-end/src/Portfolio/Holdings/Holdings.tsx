import React, { useEffect, useState } from "react";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { HoldingItem } from "./HoldingItem/HoldingItem";
import { IPortfolioDataView, IPortfolioItemView } from "../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { ILabelObject, LabelSorter } from "../Transactions/LabelSorter";
import { portfolioActions } from "../../_actions";
import { FlexCard } from "../../_components";
import { SPACING } from "../../Application/ResponsiveDesign";

export const Holdings = () => {
  const dispatch = useDispatch();

  const portfolioData: IPortfolioDataView = useSelector(
    (state: any) => state.portfolio.portfolioData[0]
  );

  const [filterField, setFilterField] = useState("value");
  const [sortAscending, setSortAscending] = useState(true);

  const sortHoldings = (field: string, ascending: boolean) => {
    return portfolioData.portfolioItems.sort((a: any, b: any) =>
      ascending ? a[field] - b[field] : b[field] - a[field]
    );
  };

  const labelData: ILabelObject[] = [
    {
      label: "Name",
    },
    {
      label: "Amount",
      filterName: "amount",
      classname: "table-right-align",
    },
    {
      label: "Price",
      filterName: "price",
      classname: "table-right-align",
    },
    {
      label: "Value",
      filterName: "value",
      classname: "table-right-align",
    },
    {
      label: "P/L",
      filterName: "profitTotal.all",
      classname: "table-right-align",
    },
  ];

  return (
    <div style={{display: "grid", gap: SPACING.flexCardGap}}>
      {portfolioData ? (
        sortHoldings(filterField, sortAscending).map(
          (pItem: IPortfolioItemView) => {
            return (
              <FlexCard children={<HoldingItem portfolioItem={pItem} />} />
            );
          }
        )
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
