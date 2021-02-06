import React from "react";
import './DeleteButton.scss'

interface DeleteButtonProps {
  clickAction(): void;
  top?: string;
  left?: string;
  right?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({clickAction, top, left, right}) => {
  return (
    <div className="delete-button-wrapper" style={{top, right, left}} onClick={() => clickAction()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "20"}}
        viewBox="0 0 24 24"
        className="delete-button-svg"
      >
        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
        
      </svg>
    </div>
  );
};
