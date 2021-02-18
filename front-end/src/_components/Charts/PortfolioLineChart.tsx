import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import { IPortfolioLineChartItem } from "../../../../types";
import { FlexCard } from "../Cards/FlexCard";

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
  const chartRef: any = useRef();

  useEffect(() => {
    data.length > 0 ? drawBasicChart() : null;
  }, [data]);

  const drawBasicChart = () => {
    const yMinValue = d3.min(data, (d: any) => d.USD);
    const yMaxValue = d3.max(data, (d: any) => d.USD);
    const xMinValue = d3.min(data, (d: any) => d.T);
    const xMaxValue = d3.max(data, (d: any) => d.T);

    const svg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("id", `${id}1`)
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("height", height)
      .attr("width", width);

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);
    const line: any = d3
      .line()
      .x((d: any) => xScale(d.T))
      .y((d: any) => yScale(d.USD))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");
    focus.append("circle").attr("r", 5).attr("class", "circle");

    const tooltip = d3
      .select(`#${id}`)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    function mousemove(event: any) {
      const bisect = d3.bisector((d: any) => d.T).left;
      const xPos = d3.pointer(event, this)[0];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      focus.attr("transform", `translate(${xScale(d0.T)},${yScale(d0.USD)})`);
      tooltip.style("opacity", "0.9");
      let dateString = new Date(d0.T);
      tooltip
        .html(`Value: ${d0.USD} date: ${dateString.toLocaleString()}`)
        .style(
          "transform",
          `translate(${xScale(d0.T) + 30}px,${yScale(d0.USD) - 30}px)`
        );
    }

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
    <div id={`${id}`}>
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
          LOADING CHART...
        </div>
      ) : null}
    </div>
  );
};
