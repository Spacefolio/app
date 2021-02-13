import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";

interface PortfolioLineChartProps {
  width: number,
  height: number,
  id: string;
}

export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({height, width,
  id,
}) => {
  const chartRef: any = useRef();

  const data = [
    {
      T: 1613062879467,
      USD: 0.009846720826306745,
    },
    {
      T: 1613070070115,
      USD: 0.009846781245782145,
    },
    {
      T: 1613073670731,
      USD: 0.009847888833915368,
    },
    {
      T: 1613080870980,
      USD: 0.00984026980064918,
    },
    {
      T: 1613084470413,
      USD: 0.00984679191945057,
    },
    {
      T: 1613091672948,
      USD: 0.009849576703648178,
    },
    {
      T: 1613095271906,
      USD: 0.009853247520986376,
    },
    {
      T: 1613098872938,
      USD: 0.00984905036074519,
    },
    {
      T: 1613102473181,
      USD: 0.00984633907747548,
    },
    {
      T: 1613106071313,
      USD: 0.009843953204669315,
    },
    {
      T: 1613109669958,
      USD: 0.009843581921861121,
    },
    {
      T: 1613113268128,
      USD: 0.009844625826653162,
    },
    {
      T: 1613120467911,
      USD: 0.009842429688847654,
    },
    {
      T: 1613124069720,
      USD: 0.009844408575809658,
    },
    {
      T: 1613127671443,
      USD: 0.009844729150953939,
    },
    {
      T: 1613134869060,
      USD: 0.009848669078241425,
    },
    {
      T: 1613138472806,
      USD: 0.009848669078241425,
    },
  ];

  useEffect(() => {
    drawChart();
  }, []);

  const drawChart = () => {
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

  //   window.addEventListener("resize", () => {

  //         redrawChart();

  // });

  // const redrawChart = () => {
  //   console.log(width, height);
  //   d3.select(`#${id}`).selectAll("*").remove();
  //   drawChart();
  // };

  return <div id={`${id}`}></div>;
};
