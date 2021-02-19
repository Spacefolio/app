import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import { IPortfolioLineChartItem } from "../../../../types";
import { FlexCard } from "../Cards/FlexCard";
import "./PortfolioLineChart.scss";

interface PortfolioLineChartProps {
  width: number;
  height: number;
  id: string;
  yAxis?: boolean;
  xAxis?: boolean;
  data: IPortfolioLineChartItem[];
}

export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({
  height,
  width,
  id,
  xAxis = false,
  yAxis = false,
  data,
}) => {
  useEffect(() => {
    data.length > 0 ? drawBasicChart() : null;
  }, [data]);

  const drawBasicChart = () => {
    const margin = {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    };

    const realwidth = width - margin.left - margin.right;
    const realheight = height - margin.top - margin.bottom;

    const yMinValue = d3.min(data, (d: any) => d.USD);
    const yMaxValue = d3.max(data, (d: any) => d.USD);
    const xMinValue = d3.min(data, (d: any) => d.T);
    const xMaxValue = d3.max(data, (d: any) => d.T);

    //create main svg component
    const svg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("id", `${id}1`)
      .attr("height", height + (margin.top + margin.bottom))
      .attr("width", width + (margin.left + margin.right))
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //scale x axis time values according to width provided
    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);

    //scale y axis dollar values according to height provided
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

    //create line object that draws the actual chart path
    const line: any = d3
      .line()
      .x((d: any) => xScale(d.T))
      .y((d: any) => yScale(d.USD))
      .curve(d3.curveNatural);

    //append line inside the svg component
    svg.append("path").datum(data).attr("class", "line").attr("d", line);

    //creates the dot on the chart showing the current value the tooltip reflects
    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");
    focus.append("circle").attr("r", 5).attr("class", "focus-circle");


    //initialize tooltip
    const tooltip = d3
      .select(`#${id}`)
      .append("div")
      .attr("class", "tooltip")

    //move tooltip and change values on mousemove
    function mousemove(event: any) {
      const bisect = d3.bisector((d: any) => d.T).left;
      const xPos = d3.pointer(event, this)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      focus.attr("transform", `translate(${xScale(d0.T)},${yScale(d0.USD)})`);
      tooltip.style("opacity", "0.9");
      let dateString = new Date(d0.T);
      tooltip
        .html(`USD ${d0.USD.toFixed(2)}\n ${dateString.toLocaleDateString()}`)
        .style("left", xScale(d0.T) + 70 + "px")
        .style("top", yScale(d0.USD) + "px");
    }

    //creates box to listen for mouse inputs
    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("height", height)
      .attr("width", width)
      .style("opacity", 0)
      .on("mouseover", () => {
        focus.style("display", null);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", "0");
      })
      .on("mousemove", mousemove);
  };

  return (
    <div style={{ position: "relative" }} id={`${id}`}>
      {data.length < 0 ? (
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
