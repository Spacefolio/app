import React, { useEffect, useRef } from "react";
import { FilterInput, FilterSection, FilterWrapper } from "./generalStyle";
import { useState } from "react";
import { Dropdown, IDropdownItem } from "../Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { DDListItem } from "../Dropdown/generalStyle";
import { FlexCard } from "..";
import { TransactionItem } from "../../Portfolio/Transactions/TransactionItem/TransactionItem";
import { OpenOrders } from "../../Portfolio";
import { OpenOrderItem } from "../../Portfolio/OpenOrders/OpenOrderItem/OpenOrderItem";

interface IFilterProps {
  data: any;
  sortAscending: boolean;
  lineItemType: "openOrder" | "transaction";
}

export const Filter: React.FC<IFilterProps> = ({
  data,
  sortAscending,
  lineItemType,
}) => {
  const container = useRef();
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [assetSearchDropdownVisible, setAssetSearchDropdownVisible] = useState(
    false
  );
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [assetType, setAssetType] = useState<string>();
  const [transactionType, setTransactionType] = useState<string>("All Types");

  const ddownItems: IDropdownItem[] = [
    {
      text: "All Types",
    },
    {
      text: "Buy",
    },
    {
      text: "Sell",
    },
    {
      text: "Withdrawal",
    },
    {
      text: "Deposit",
    },
  ];

  const GetItemsAtDate = (dateGroupedData: any, date: string) => {
    return dateGroupedData[date].map((item: any) => {
      switch (lineItemType) {
        case "transaction":
          return <TransactionItem transactionItem={item} />;
        case "openOrder":
          return <OpenOrderItem openOrderItem={item} />;
      }
    });
  };

  type ILineItemArraySorter = [{ date: number }];

  const RenderLineItems = () => {
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

  const SortLineItems = (data: ILineItemArraySorter, ascending: boolean) => {
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

  const DatePickerSection = () => {
    return (
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
    );
  };
  const AssetSearchSection = () => {
    return (
      <FilterSection>
        <FilterInput ref={container}>
          {typeDropdownVisible ? (
            <Dropdown
              setVisiblity={assetSearchDropdownVisible}
              containerRef={container}
              dropdownItemList={ddownItems}
              isVisible={typeDropdownVisible}
              defaultItemClickHandler={setTransactionType}
            />
          ) : null}
          <input
            onFocus={() => setAssetSearchDropdownVisible(true)}
            placeholder="All Types"
          />

          <div>icon</div>
        </FilterInput>
      </FilterSection>
    );
  };
  const TransactionTypeSelector = () => {
    return (
      <FilterSection>
        <FilterInput
          onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}
          ref={container}
        >
          <div style={{ display: "flex", padding: "0px 5px" }}>
            <div>{transactionType}</div>
            <div>icon</div>
          </div>
          {typeDropdownVisible ? (
            <Dropdown
              setVisiblity={setTypeDropdownVisible}
              containerRef={container}
              dropdownItemList={ddownItems}
              isVisible={typeDropdownVisible}
              defaultItemClickHandler={setTransactionType}
            />
          ) : null}
        </FilterInput>
      </FilterSection>
    );
  };

  return (
    <React.Fragment>
      <FilterWrapper>
        {/* {DatePickerSection()} */}
        {/* {AssetSearchSection()} */}
        {/* {TransactionTypeSelector()} */}
      </FilterWrapper>
      {RenderLineItems()}
    </React.Fragment>
  );
};
