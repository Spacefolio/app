import React, { useEffect, useRef } from "react";
import { FilterInput, FilterSection, FilterWrapper } from "./generalStyle";
import { useState } from "react";
import { Dropdown, DropdownItem } from "../Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { DDListItem } from "../Dropdown/generalStyle";
import { FlexCard } from "..";

export interface ILabelObject {
  label: string;
  filterName?: string;
  classname?: string;
}

interface ILineItemArraySorter {
  date: number;
}

export const RenderLineItems = (
  GetItemsAtDate: any,
  data: any,
  sortAscending: boolean,
  filterField?: string
) => {
  const sortedShit = SortLineItems(data, sortAscending);

  if (data) {
    return Object.keys(sortedShit).map((key) => {
      return (
        <>
          <div style={{ padding: "10px" }}>{key}</div>
          <FlexCard
            children={
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                {GetItemsAtDate(sortedShit, key)}
              </div>
            }
          />
        </>
      );
    });
  } else {
    return <div>loading...</div>;
  }
};

export const SortLineItems = (
  data: ILineItemArraySorter[],
  ascending: boolean
) => {
  var dateItems: any = {};
  data
    .sort((a: any, b: any) =>
      ascending ? a["date"] - b["date"] : b["date"] - a["date"]
    )
    .map((item) => {
      let dateString = new Date(item.date).toDateString();
      if (dateItems[dateString] == undefined) {
        dateItems[dateString] = [];
      }
      dateItems[dateString].push(item);
    });
  return dateItems;
};

interface IFilterProps {}

export const Filter: React.FC<IFilterProps> = ({}) => {
  const container = useRef();
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [fromDate, setFromDate] = useState(new Date("2014"));
  const [toDate, setToDate] = useState(new Date("2014"));

  const ddownItems: DropdownItem[] = [
    {
      id: 4,
      title: "BUY",
      onClickHandler: () => {
        console.log("hio");
      },
      selected: false,
      key: "yo",
    },
  ];

  const createDropdownItems = () => {
    return ddownItems.map((item: DropdownItem) => {
      return (
        <DDListItem
          key={item.key}
          onClick={() => item.onClickHandler()}
          className="dd-list-item"
        >
          {item.title}
        </DDListItem>
      );
    });
  };

  return (
    <FilterWrapper>
      <FilterSection>
        <FilterInput>
          <DatePicker
            selected={fromDate}
            onChange={(date: any) => setFromDate(date)}
          />
          <DatePicker
            selected={toDate}
            onChange={(date: any) => setToDate(date)}
          />
          <div>icon</div>
        </FilterInput>
      </FilterSection>
      <FilterSection>
        <FilterInput>
          <input type="text" placeholder="Search" />
          <div>icon</div>
        </FilterInput>
      </FilterSection>
      <FilterSection>
        <FilterInput ref={container}>
          <input
            onFocus={() => setTypeDropdownVisible(true)}
            placeholder="All Types"
          />
          {typeDropdownVisible ? (
            <Dropdown
              setVisiblity={setTypeDropdownVisible}
              containerRef={container}
              children={createDropdownItems()}
              isVisible={typeDropdownVisible}
            />
          ) : null}
          <div>icon</div>
        </FilterInput>
      </FilterSection>
    </FilterWrapper>
  );
};
