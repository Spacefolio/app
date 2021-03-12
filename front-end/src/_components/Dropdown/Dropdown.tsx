import React, { useState, useEffect } from "react";
import { GrowFromZero } from "../../_styles";
import { DDList, DDListItem, DDWrapper } from "./DropdownStyles";

export interface IDropdownItem {
  text: string;
  onClickHandler?(): void;
  selected?: boolean;
}
interface DropdownProps {
  children: React.ReactNode;
  setVisiblity: any;
  isVisible: boolean;
  //this is the ref to the dropdown toggle button
  containerRef: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  setVisiblity,
  isVisible,
  containerRef,
  children,
}) => {
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (containerRef.current.contains(e.target)) {
      return;
    } else {
      setVisiblity(false);
    }
  };

  return (
    <React.Fragment>
      <GrowFromZero in={isVisible}>
        <DDWrapper style={{right: '0'}} >{children}</DDWrapper>
      </GrowFromZero>
    </React.Fragment>
  );
};
