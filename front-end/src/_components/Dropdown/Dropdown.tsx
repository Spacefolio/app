import React, { useState, useEffect } from "react";
import { DDList, DDListItem, DDWrapper } from "./generalStyle";

export interface DropdownItem {
  id: number;
  title: string;
  onClickHandler?(): void;
  selected: boolean;
  key: string;
}
interface DropdownProps {
  setVisiblity: any;
  isVisible: boolean;
  alignment?: "below" | "above" | "center";
  children: any;
  //this is the ref to the dropdown toggle button
  containerRef: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  setVisiblity,
  children,
  isVisible,
  alignment,
  containerRef,
}) => {
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (containerRef.current.contains(e.target)) {
      return;
    } else {
      setVisiblity(!isVisible);
    }
  };

  return (
    <DDWrapper>
      <DDList>
       { children}
      </DDList>
    </DDWrapper>
  );
};
