import React, { useEffect, useRef } from "react";
import {
  DateGroupedLineItemContainer,
  DateLabel,
  FilterInput,
  FilterSection,
  FilterWrapper,
} from "./FilterStyles";
import { useState } from "react";
import { Dropdown, IDropdownItem } from "../Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { FlexCard, GrowFromZero } from "../../GlobalStyles";
import { Grow, LinearProgress } from "@material-ui/core";

interface IFilterProps {
  data: any;
  sortAscending: boolean;
  LineItemComponent: any;
}

export const Filter: React.FC<IFilterProps> = ({
  data,
  sortAscending,
  LineItemComponent,
}) => {
  const container = useRef();
  const [typeDropdownVisible, setTypeDropdownVisible] = useState(false);
  const [assetSearchDropdownVisible, setAssetSearchDropdownVisible] = useState(
    false
  );
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [transactionType, setTransactionType] = useState<string>("All Types");

  useEffect(() => {}, []);

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
      return <LineItemComponent item={item} />;
    });
  };

  type ILineItemArraySorter = [{ date: number }];

  const RenderLineItems = () => {
    const sortedShit = CreateDateGroupedList(data, sortAscending);

    return Object.keys(sortedShit).map((key) => {
      return (
        <React.Fragment>
          <DateLabel key={key}>{key}</DateLabel>
          <GrowFromZero in={true}>
            <FlexCard key={key + "-data"}>
              <DateGroupedLineItemContainer>
                {GetItemsAtDate(sortedShit, key)}
              </DateGroupedLineItemContainer>
            </FlexCard>
          </GrowFromZero>
        </React.Fragment>
      );
    });
  };

  const CreateDateGroupedList = (
    data: ILineItemArraySorter,
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

  // const DatePickerSection = () => {
  //   return (
  //     <FilterSection>
  //       <FilterInput>
  //         <DatePicker
  //           selected={fromDate}
  //           onChange={(date: any) => setFromDate(date)}
  //         />
  //         <DatePicker
  //           selected={toDate}
  //           onChange={(date: any) => setToDate(date)}
  //         />
  //         <div>icon</div>
  //       </FilterInput>
  //     </FilterSection>
  //   );
  // };
  // const AssetSearchSection = () => {
  //   return (
  //     <FilterSection>
  //       <FilterInput ref={container}>
  //         {typeDropdownVisible ? (
  //           <Dropdown
  //             setVisiblity={assetSearchDropdownVisible}
  //             containerRef={container}

  //             isVisible={typeDropdownVisible}
  //             defaultItemClickHandler={setTransactionType}
  //           />
  //         ) : null}
  //         <input
  //           onFocus={() => setAssetSearchDropdownVisible(true)}
  //           placeholder="All Types"
  //         />

  //         <div>icon</div>
  //       </FilterInput>
  //     </FilterSection>
  //   );
  // };
  // const TransactionTypeSelector = () => {
  //   return (
  //     <FilterSection>
  //       <FilterInput
  //         onClick={() => setTypeDropdownVisible(!typeDropdownVisible)}
  //         ref={container}
  //       >
  //         <div style={{ display: "flex", padding: "0px 5px" }}>
  //           <div>{transactionType}</div>
  //           <div>icon</div>
  //         </div>
  //         {typeDropdownVisible ? (
  //           <Dropdown
  //             setVisiblity={setTypeDropdownVisible}
  //             containerRef={container}

  //             isVisible={typeDropdownVisible}
  //           />
  //         ) : null}
  //       </FilterInput>
  //     </FilterSection>
  //   );
  // };

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
