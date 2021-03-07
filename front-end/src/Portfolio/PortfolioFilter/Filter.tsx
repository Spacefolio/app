import React, { useEffect, useRef } from "react";
import {
  TableRowStyled,
  DateLabel,
  FilterInput,
  FilterSection,
  FilterWrapper,
  TableCellStyled,
} from "./Styles";
import { useState } from "react";
import {
  Dropdown,
  IDropdownItem,
} from "../../_components/Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { FlexCard, GrowFromZero, InlineDiv } from "../../AlgonexStyles";
import {
  Grow,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { IRootState } from "../../_reducers";
import { useSelector } from "react-redux";
import { List, WindowScroller } from "react-virtualized";
import "react-virtualized/styles.css";
import useMedia from "use-media";
import { RD } from "../../AlgonexStyles/ResponsiveDesign";

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

  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

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
          <TableRow>
            <TableCellStyled style={{ height: "50px" }} colSpan={100}>
              <InlineDiv>
                <DateLabel key={key}>
                  <Typography variant={"h6"}>{key}</Typography>
                </DateLabel>
              </InlineDiv>
            </TableCellStyled>
          </TableRow>
          {!isMobile ? (
            <TableRowStyled>
              <TableCellStyled>Type</TableCellStyled>
              <TableCellStyled align="right">Amount</TableCellStyled>
              <TableCellStyled align="right">Price</TableCellStyled>
              <TableCellStyled align="right">Value</TableCellStyled>
              <TableCellStyled align="right">Exchange/Pair</TableCellStyled>
              <TableCellStyled align="right">Fee</TableCellStyled>
            </TableRowStyled>
          ) : (
            <TableRowStyled>
              <TableCellStyled>Type</TableCellStyled>
              <TableCellStyled align="right">Amount</TableCellStyled>
              <TableCellStyled align="right">Price</TableCellStyled>
              <TableCellStyled align="right">Value</TableCellStyled>
            </TableRowStyled>
          )}

          {/* <GrowFromZero in={true}> */}
          {GetItemsAtDate(sortedShit, key)}
          {/* </GrowFromZero> */}
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
      {!isMobile ? (
        <Table>
          <TableHead style={{ position: "sticky", top: "60px" }}>
            <TableRow style={{ display: "none" }}>
              <TableCell></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{RenderLineItems()}</TableBody>
        </Table>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{RenderLineItems()}</TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};
