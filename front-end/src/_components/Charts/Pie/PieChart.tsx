import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import "./PieChart.scss";

interface PortfolioLineChartProps {
  width: number;
  height: number;
  id: string;
}

export const PortfolioPieChart: React.FC<PortfolioLineChartProps> = ({
  height,
  width,
  id,
}) => {
  var data: any = { a: 9, b: 20, c: 30, d: 8, e: 12 };
  useEffect(() => {
    data? drawChart(): null
  }, []);

  
  const drawChart = () => {
    
  };

  return (
    <div style={{ position: "relative" }} id={`${id}`}>
      {data < 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width,
            height,
          }}
        >
          <div>LOADING CHART...</div>
        </div>
      ) : null}
    </div>
  );
};
