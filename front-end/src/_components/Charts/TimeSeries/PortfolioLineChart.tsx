import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import { IPortfolioLineChartItem, timeframe } from "../../../../../types";
import "./PortfolioLineChart.scss";
import moment from "moment";
import { IRootState } from "../../../_reducers";
import { useSelector } from "react-redux";
import { NONAME } from "dns";

interface PortfolioLineChartProps {
  width: number;
  height: number;
  id: string;
  yAxis?: boolean;
  xAxis?: boolean;
  timeframe?: timeframe;
  data: IPortfolioLineChartItem[];
}

export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({
  height,
  timeframe,
  width,
  id,
  xAxis = false,
  yAxis = false,
  data,
}) => {
  const viewType = useSelector(
    (state: IRootState) => state.applicationView.currentViewType
  );

  useEffect(() => {
    data.length > 0 ? drawBasicChart() : null;
  }, [data, width, height]);

  const margin = {
    top: 8,
    bottom: xAxis ? 30 : 8,
    left: yAxis ? 80 : 8,
    right: 8,
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
      .attr("height", height + (margin.top + margin.bottom))
      .attr("width", width + (margin.left + margin.right))
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
      .range([0, width]);

    //scale y axis dollar values according to height provided
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([yMinValue, yMaxValue]);

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
    xAxis
      ? svg
          .append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + height + ")")
          .call(styledXAxis)
          .call((g) => g.select(".domain").remove())
      : null;

    //append y axis
    yAxis
      ? svg
          .append("g")
          .attr("class", "y-axis")
          .call(styledYAxis)
          .call((g) => g.select(".domain").remove())
      : null;

    //create line object that draws the actual chart path
    const line: any = d3
      .line()
      .x((d: any) => xScale(d.T))
      .y((d: any) => yScale(d.USD))
      .curve(d3.curveLinear);

    //append line inside the svg component
    svg.append("path").datum(data).attr("class", "line").attr("d", line);
    // .style("filter", "url(#glow)");

    //creates the dot on the chart showing the current value the tooltip reflects
    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    //append circle to the focus element
    focus
      .append("circle")
      .attr("r", 5)
      .attr("class", "focus-circle")
      .style("filter", "url(#glow)");

    //append the intersection line path
    // focus
    //   .append("line")
    //   .attr("class", "x")
    //   .style("stroke", "blue")
    //   .style("opacity", 0.5)
    //   .attr("y1", -height)
    //   .attr("y2", height);

    //move tooltip and change values on mousemove
    const TooltipDimensions = {
      W: 90,
      H: 50,
    };

    function mousemove(event: any) {
      event.preventDefault();
      const bisect = d3.bisector((d: any) => d.T).left;
      const xPos = d3.pointer(event, this)[0];
      const yPos = d3.pointer(event, this)[1];
      const x0 = bisect(data, xScale.invert(xPos));
      const d0 = data[x0];
      var tooltipY;
      const tooltipX =
        xPos - TooltipDimensions.W / 2 < chartWidth
          ? xPos - TooltipDimensions.W / 2 < 0
            ? 0
            : xPos - TooltipDimensions.W / 2
          : chartWidth;

      if (viewType == "desktop") {
        tooltipY =
          yScale(d0.USD) - TooltipDimensions.H < 0
            ? yScale(d0.USD)
            : yScale(d0.USD) - TooltipDimensions.H;
      } else {
        tooltipY =
          yPos - TooltipDimensions.H > chartHeight ||
          yPos - TooltipDimensions.H * 2 < 0
            ? yScale(d0.USD) - TooltipDimensions.H < 0
              ? yScale(d0.USD)
              : yScale(d0.USD) - TooltipDimensions.H
            : yPos - 2 * TooltipDimensions.H;
      }
      focus.attr("transform", `translate(${xScale(d0.T)},${yScale(d0.USD)})`);
      tooltip.style("opacity", "0.9");
      let dateString = new Date(d0.T * 1);
      tooltip.attr("transform", `translate(${tooltipX},${tooltipY})`);
      tooltipValue.html(`${d0.USD.toFixed(2)}`);
      tooltipDate.html(() => {
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
      });
      tooltipQuote.html(`${"USD"}`);
    }

    function mouseover(event: any) {
      event.preventDefault();
      focus.style("display", null);
      tooltip.style("opacity", 0.9);
    }

    function mouseout(event: any) {
      event.preventDefault();
      tooltip.style("opacity", "0");
      focus.style("display", "none");
    }
    //initialize tooltip
    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const tooltipBox = tooltip
      .append("rect")
      .attr("height", TooltipDimensions.H)
      .attr("width", TooltipDimensions.W)
      .style("background-color", "white")
      .attr("class", "tooltipBox");

    const tooltipText = tooltip
      .append("text")
      .attr("class", "tooltip-texts")
      .attr("x", 10)
      .attr("y", 20)
      .attr("data-z-index", 3);

    //creates box to listen for mouse inputs
    const listenerBox = svg
      .append("rect")
      .attr("class", "overlay")
      .attr("height", height)
      .attr("width", width)
      .style("opacity", 0);
      // .on("pointerenter", mouseover)
      // .on("pointermove", mousemove)
      // .on("pointerleave", mouseout);

    viewType == "mobile"
      ? listenerBox
          .on("pointerdown", mouseover)
          .on("pointermove", mousemove, false)
          .on("pointercancel", mouseout, false)

      : listenerBox
          .on("mouseover", mouseover)
          .on("mouseout", mouseout)
          .on("mousemove", mousemove);


    //create sub component of the tooltip to render the Currency denomination in
    const tooltipQuote = tooltipText
      .append("tspan")
      .attr("class", "tooltip-quote")
      .attr("dx", 0)
      .attr("dy", 0);

    //create sub component of the tooltip to render the portfolio value in
    const tooltipValue = tooltipText
      .append("tspan")
      .attr("class", "tooltip-value")
      .attr("dx", 5)
      .attr("dy", 0);

    //create sub component of the tooltip to render the date in
    const tooltipDate = tooltipText
      .append("tspan")
      .attr("class", "tooltip-date")
      .attr("x", 10)
      .attr("dy", 20);
  };

  return (
    <div style={{ position: "relative" }} id={`${id}`}>
      {!data && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `${chartWidth}px`,
            height: `${chartHeight}px`,
            // touchAction: "none",
            // pointerEvents: "none",
          }}
        >
          <div>LOADING CHART...</div>
        </div>
      )}
    </div>
  );
};
