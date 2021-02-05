import { type } from "os";
import { node } from "prop-types";
import React, { useState, useEffect } from "react";
import "./Dropdown.scss";

type DropdownItem = {
  id: number;
  title: string;
  onClickHandler?(): void;
  selected: boolean;
  key: string;
};
interface DropdownProps {
  items: DropdownItem[];
  setVisiblity: any;
  isVisible: boolean;
  alignment?: "below" | "above" | "center";
  //this is the ref to the dropdown toggle button
  containerRef: any;
}

const Dropdown: React.FC<DropdownProps> = ({
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
    <div className="dd-wrapper" style={{}}>
      <div className="dd-list"></div>
      {dItems.map((item: DropdownItem) => {
        return (
          <div key={item.key} onClick={() => item.onClickHandler()} className="dd-list-item">
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
