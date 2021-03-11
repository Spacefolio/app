import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import { IPortfolioLineChartItem, timeframe } from "../../../../../types";
import "./PortfolioLineChart.scss";
import moment from "moment";
import { IRootState } from "../../../_reducers";
import { useSelector } from "react-redux";
import { NONAME } from "dns";
import { ViewLoading } from "../..";
import { COLORS, RD } from "../../../AlgonexStyles/ResponsiveDesign";
import useMedia from "use-media";

interface PortfolioLineChartProps {
  setPV?: React.Dispatch<any>;
  setDate?: React.Dispatch<any>;
  width: number;
  height: number;
  id: string;
  yAxis?: boolean;
  xAxis?: boolean;
  timeframe?: timeframe;
  data: IPortfolioLineChartItem[];
}

export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({
  setPV,
  setDate,
  height,
  timeframe,
  width,
  id,
  xAxis = false,
  yAxis = false,
  data,
}) => {
  const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

  useEffect(() => {
    data && drawBasicChart();
  }, [data, width, height]);

  const margin = {
    top: 5,
    bottom: xAxis ? 30 : 5,
    left: yAxis ? 80 : 0,
    right: 0,
  };

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  interface IChartPoint {
    T: number;
    USD: number;
  }

  const drawBasicChart = () => {
    const yMinValue: number = d3.min(data, (d: IChartPoint) => d.USD);
    const yMaxValue: number = d3.max(data, (d: any) => d.USD);
    const xMinValue: number = d3.min(data, (d: any) => d.T);
    const xMaxValue: number = d3.max(data, (d: any) => d.T);

    d3.select(`#${id}2`).remove();
    d3.select(`#${id}1`).remove();

    //create main svg component
    const svg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("id", `${id}1`)
      .attr("height", height)
      .attr("width", width)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //Append the gradient container
    var defs = svg.append("defs");

    //append the glow filter
    var filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "1.5")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    //scale x axis time values according to width provided
    const xScale = d3
      .scaleTime()
      .domain([xMinValue, xMaxValue])
      .range([0, chartWidth]);

    //scale y axis dollar values according to height provided
    const yScale = d3
      .scaleLinear()
      .range([chartHeight, 0])
      .domain([yMinValue, yMaxValue]);

    var areaGradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "areaGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areaGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", COLORS.accentBase)
      .attr("stop-opacity", 0.6);

    areaGradient
      .append("stop")
      .attr("offset", "80%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    //create xAxis component
    const styledXAxis = d3
      .axisBottom(xScale)
      .ticks(6)
      .tickFormat((d: any) => {
        let dateString = d.toString();
        switch (timeframe) {
          case "ALL":
          case "1Y":
            return (
              moment(dateString).format("MMM") +
              "'" +
              moment(dateString).format("YY")
            );
          case "6M":
          case "3M":
          case "1M":
            return moment(dateString).format("DD MMM");
          case "1W":
          case "24H":
            return moment(dateString).format("h:mm");
        }
      })
      .tickSizeOuter(0)
      .tickSizeInner(0);

    //create yAxis component
    const styledYAxis = d3
      .axisLeft(yScale)
      .ticks(6)
      .tickFormat((d) => "$" + d)
      .tickSizeOuter(0)
      .tickSizeInner(0);

    //append x axis
    xAxis &&
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(styledXAxis)
        .call((g) => g.select(".domain").remove());

    //append y axis
    yAxis &&
      svg
        .append("g")
        .attr("class", "y-axis")
        .call(styledYAxis)
        .call((g) => g.select(".domain").remove());

    //create line object that draws the actual chart path
    const line: any = d3
      .line()
      .x((d: any) => xScale(d.T))
      .y((d: any) => yScale(d.USD))
      .curve(d3.curveMonotoneX);

    //append line inside the svg component
    var path = svg
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

    // path
    //   .attr("stroke-dasharray", totalLength + " " + totalLength)
    //   .attr("stroke-dashoffset", totalLength)
    //   .transition()
    //   .duration(1000)
    //   // .ease(easement)
    //   .attr("stroke-dashoffset", 0);

    // .style("filter", "url(#glow)");

    //creates the spot on the chart showing the current value the tooltip reflects
    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    // append the intersection line path
    focus
      .append("line")
      .attr("class", "x")
      .style("opacity", 1)
      .attr("y1", -height * 2)
      .attr("y2", height * 2);

    const focusCircle = focus
      .append("circle")
      .attr("r", 5)
      .attr("class", "focus-circle")
      .style("opacity", 1);

    function handleMove(xPos: number) {
      const bisect = d3.bisector((d: any) => d.T).center;
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      focus
        .attr("transform", `translate(${xScale(d0.T)},${yScale(d0.USD)})`)
        .style("display", null);
      let dateString = new Date(d0.T * 1);

      let valueDate = () => {
        let dateString = d0.T;
        switch (timeframe) {
          case "ALL":
          case "1Y":
          case "6M":
          case "3M":
          case "1M":
            return moment(dateString).format("ll");
          case "1W":
            return moment(dateString).format("ddd h:mm");
          case "24H":
            return moment(dateString).format("h:mm");
        }
      };

      // d3.select("#PVID").html(d0.USD.toFixed(2));
      // d3.select("#PDID").html(valueDate);
    }

    function mousemove(event: MouseEvent) {
      event.preventDefault();
      const xPos = d3.pointer(event, this)[0];
      handleMove(xPos);
    }

    function touchmove(event: any) {
      if (event.originalEvent !== undefined && event.cancelable) {
        event.preventDefault();
      }
      const touchList = event.touches[0];
      const xPos = touchList.clientX;
      handleMove(xPos);
    }

    function mouseover(event: any) {
      focus.style("display", null);
      // setDate(true);
      // setPV(true);
    }

    function mouseout(event: any) {
      if (event.originalEvent !== undefined && event.cancelable) {
        event.preventDefault();
      }
      event.preventDefault();
      focus.style("display", "none");
      // setDate(false);
      // setPV(false);
    }

    //creates box to listen for mouse inputs
    const listenerBox = svg
      .append("rect")
      .attr("class", "overlay")
      .attr("height", chartHeight)
      .attr("width", chartWidth)
      .style("cursor", "crosshair")
      .style("opacity", 0);

    isMobile &&
      listenerBox
        .on("touchstart", touchmove, false)
        .on("touchmove", touchmove)
        .on("touchend", mouseout);

    !isMobile &&
      listenerBox
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousemove", mousemove);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: 0,
        margin: 0,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {!(data.length > 0) ? <ViewLoading /> : <div id={`${id}`}></div>}
    </div>
  );
};
