import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataLabelItemWrapper, DataLabelsContainer } from "../portfolioStyles";
import { ITransactionItemView } from "../../../../types";
import { TransactionItem } from "./TransactionItem/TransactionItem";
import { portfolioActions } from "../../_actions";
import { useState } from "react";

export interface ILabelObject {
  label: string;
  filterName?: string;
  classname?: string;
}

interface ILabelSorterProps {
  labelObject: ILabelObject[];
  setFilter: any;
  curFilter: string;
  isAscending: boolean;
  setAscending: any;
}

export const LabelSorter: React.FC<ILabelSorterProps> = ({
  labelObject,
  setFilter,
  curFilter,
  isAscending,
  setAscending,
}) => {
  return (
    <thead>
      <tr>
        {labelObject.map((label: ILabelObject) => {
          return (
            <th
              style={{cursor: label.filterName?"pointer":'default'}}
              onClick={
                label.filterName
                  ? () =>
                      curFilter == label.filterName
                        ? setAscending(!isAscending)
                        : setFilter(label.filterName)
                  : null
              }
              className={label.classname}
            >
              {label.label}
              {curFilter == label.filterName ? (
                isAscending ? (
                  <img height="11px" width="11px" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5IDE0IiBoZWlnaHQ9IjE0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyOSAxNCIgd2lkdGg9IjI5cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5Z29uIGZpbGw9IiMyMzFGMjAiIHBvaW50cz0iMC4xNSwxNCAxNC41LC0wLjM1IDI4Ljg1LDE0ICIvPjwvc3ZnPg=="/>
                ) : (
                  <img height="11px" width="11px" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5IDE0IiBoZWlnaHQ9IjE0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyOSAxNCIgd2lkdGg9IjI5cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwb2x5Z29uIGZpbGw9IiMyMzFGMjAiIHBvaW50cz0iMC4xNSwwIDE0LjUsMTQuMzUgMjguODUsMCAiLz48L3N2Zz4="/>
                )
              ) : null}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
