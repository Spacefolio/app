import React from "react";
import { BaseButton, ClickableSvg } from "../../GlobalStyles";
import { SyncIconWrapper } from "./IconStyles";

interface ISvgProps {
  style?: object;
  direction?: "up" | "down" | "left" | "right";
}

interface SyncButtonProps {
  isSyncing: boolean;
}

export const SyncIcon: React.FC<SyncButtonProps> = ({ isSyncing }) => {
  return (
    <SyncIconWrapper
      xmlns={"http://www.w3.org/2000/svg"}
      viewBox="0 0 24 24"
      isSyncing={isSyncing}
    >
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
    </SyncIconWrapper>
  );
};

export const CloseIcon: React.FC<ISvgProps> = ({ style }) => {
  return (
    <ClickableSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className="close-button"
      style={style}
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </ClickableSvg>
  );
};

export const EditIcon: React.FC<ISvgProps> = ({ style }) => {
  return (
    <ClickableSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="edit-button"
      style={style}
    >
      <path d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z" />
    </ClickableSvg>
  );
};

export const DeleteIcon: React.FC<ISvgProps> = ({ style }) => {
  return (
    <ClickableSvg
      fill={"var(--accent-light3)"}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="delete-button"
    >
      <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
    </ClickableSvg>
  );
};

export const BotsIcon: React.FC<ISvgProps> = ({ style }) => {
  return (
    <ClickableSvg
      xmlns="http://www.w3.org/2000/svg"
      fill={"var(--accent-light3)"}
      style={style}
      viewBox="0 -11 438.30376 438"
    >
      <path d="m276.15625 201.902344h37v37h-37zm0 0" />
      <path d="m134.15625 301.902344h170v25h-170zm0 0" />
      <path d="m0 257.847656c-.015625 14.839844 9.863281 27.867188 24.15625 31.855469v-63.699219c-14.289062 3.988282-24.1640625 17.011719-24.15625 31.84375zm0 0" />
      <path d="m134.15625 342.902344h170v25h-170zm0 0" />
      <path d="m40.15625 415.902344h358v-281h-358zm280-40c0 4.421875-3.582031 8-8 8h-186c-4.417969 0-8-3.578125-8-8v-82c0-4.417969 3.582031-8 8-8h186c4.417969 0 8 3.582031 8 8zm-60-182c0-4.417969 3.582031-8 8-8h53c4.417969 0 8 3.582031 8 8v53c0 4.421875-3.582031 8-8 8h-53c-4.417969 0-8-3.578125-8-8zm-151 0c0-4.417969 3.582031-8 8-8h53c4.417969 0 8 3.582031 8 8v53c0 4.421875-3.582031 8-8 8h-53c-4.417969 0-8-3.578125-8-8zm0 0" />
      <path d="m414.15625 226v63.699219c14.277344-4.003907 24.148438-17.023438 24.148438-31.851563s-9.871094-27.847656-24.148438-31.847656zm0 0" />
      <path d="m125.15625 201.902344h37v37h-37zm0 0" />
      <path d="m226.15625 126.902344v-44.578125c20.992188-3.601563 35.820312-22.550781 34.269531-43.796875-1.546875-21.242188-18.964843-37.839844-40.257812-38.363282-21.292969-.523437-39.503907 15.199219-42.09375 36.34375-2.589844 21.140626 11.289062 40.792969 32.082031 45.425782v44.96875zm0 0" />
    </ClickableSvg>
  );
};

interface IDirectionalSVG extends ISvgProps {
  direction: "up" | "down" | "left" | "right";
}
export const ArrowIcon: React.FC<IDirectionalSVG> = ({ style, direction }) => {
  var rotationStyle;
  switch (direction) {
    case "up":
      rotationStyle = `rotate(180deg)`;
      break;
    case "down":
      rotationStyle = `rotate(0deg)`;
      break;
    case "left":
      rotationStyle = `rotate(90deg)`;
      break;
    case "right":
      rotationStyle = `rotate(-90deg)`;
      break;
  }
  return (
    <ClickableSvg
      xmlns="http://www.w3.org/2000/svg"
      fill={"var(--accent-light3)"}
      style={{ ...style, transform: rotationStyle }}
      viewBox="0 0 284.929 284.929"
    >
      <g>
        <path d="M282.082,76.511l-14.274-14.273c-1.902-1.906-4.093-2.856-6.57-2.856c-2.471,0-4.661,0.95-6.563,2.856L142.466,174.441   L30.262,62.241c-1.903-1.906-4.093-2.856-6.567-2.856c-2.475,0-4.665,0.95-6.567,2.856L2.856,76.515C0.95,78.417,0,80.607,0,83.082   c0,2.473,0.953,4.663,2.856,6.565l133.043,133.046c1.902,1.903,4.093,2.854,6.567,2.854s4.661-0.951,6.562-2.854L282.082,89.647   c1.902-1.903,2.847-4.093,2.847-6.565C284.929,80.607,283.984,78.417,282.082,76.511z" />
      </g>
    </ClickableSvg>
  );
};