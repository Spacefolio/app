import { Portal } from "@material-ui/core";
import React, { useRef, useEffect } from "react";
import Thpace from "Thpace";
import { FullsizeContainer } from "./Styles";

interface DashboardNoExchangesProps {}

export const DashboardNoExchanges: React.FC<DashboardNoExchangesProps> = ({}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const settings = {
      colors: ["#4CB1EF", "#424959", "#FF4B44"],
      triangleSize: 100,
      automaticResize: true,
    };

    Thpace.create(canvas, settings);
  }, []);

  return (<div></div>);
};
