import React, { useState, useCallback, useEffect, useRef } from "react";
import "./Scrollbox.scss";

const SCROLL_BOX_MIN_HEIGHT = 20;

interface IScrollboxProps {
  children?: any;
  className?: string;
}

export const Scrollbox: React.FC<IScrollboxProps> = ({
  children,
  className,
}) => {


  return <div className={"scrollhost-container"}>{children}</div>;
};
