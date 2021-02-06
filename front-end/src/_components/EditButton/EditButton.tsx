import React from "react";
import './EditButton.scss'
interface EditButtonProps {
  clickAction(): void;
  top?: string;
  left?: string;
  right?: string;
}

export const EditButton: React.FC<EditButtonProps> = ({clickAction, top, left, right}) => {
  return (
    <div className="Edit-button-wrapper" style={{top, right, left}} onClick={() => clickAction()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "1.6em"}}
        viewBox="0 0 24 24"
        className="Edit-button-svg"
      >
        <path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z" />
      </svg>
    </div>
  );
};
