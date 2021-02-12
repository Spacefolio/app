import React, { useState, useEffect } from "react";
import { DDList, DDListItem, DDWrapper } from "./generalStyle";

interface DropdownItem {
  id: number;
  title: string;
  onClickHandler?(): void;
  selected: boolean;
  key: string;
}
interface DropdownProps {
  items: DropdownItem[];
  setVisiblity: any;
  isVisible: boolean;
  alignment?: "below" | "above" | "center";
  //this is the ref to the dropdown toggle button
  containerRef: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  setVisiblity,
  isVisible,
  alignment,
  containerRef,
}) => {
  const [dItems, setdItems] = useState(items);

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
        {dItems.map((item: DropdownItem) => {
          return (
            <DDListItem
              key={item.key}
              onClick={() => item.onClickHandler()}
              className="dd-list-item"
            >
              {item.title}
            </DDListItem>
          );
        })}
      </DDList>
    </DDWrapper>
  );
};
