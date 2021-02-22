import React, { useState, useEffect } from "react";
import { DDList, DDListItem, DDWrapper } from "./generalStyle";

export interface IDropdownItem {
  text: string;
  onClickHandler?(): void;
  selected?: boolean;
}
interface DropdownProps {
  dropdownItemList: IDropdownItem[];
  setVisiblity: any;
  isVisible: boolean;
  alignment?: "below" | "above" | "center";
  //this is the ref to the dropdown toggle button
  containerRef: any;
  defaultItemClickHandler?: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  dropdownItemList,
  setVisiblity,
  isVisible,
  alignment,
  containerRef,
  defaultItemClickHandler,
}) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const DecideClickAction = (item: IDropdownItem) => {
    if (item.onClickHandler != undefined) {
      return item.onClickHandler();
    } else if (defaultItemClickHandler != undefined) {
      return defaultItemClickHandler(item.text);
    } else return () => {};
  };

  const createDropdownItems = () => {
    return dropdownItemList.map((item: IDropdownItem) => {
      return (
        <DDListItem key={item.text} onClick={() => DecideClickAction(item)}>
          {item.text}
        </DDListItem>
      );
    });
  };

  const handleClickOutside = (e: any) => {
    if (containerRef.current.contains(e.target)) {
      return;
    } else {
      setVisiblity(!isVisible);
    }
  };

  return (
    <DDWrapper>
      <DDList>{createDropdownItems()}</DDList>
    </DDWrapper>
  );
};
