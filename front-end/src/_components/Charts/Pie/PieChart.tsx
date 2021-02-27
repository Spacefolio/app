import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import * as d3 from "d3";
import "./PieChart.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../../_reducers";
import { portfolioActions } from "../../../_actions";
import { IPortfolioItemView } from "../../../../../types";

interface PortfolioLineChartProps {
  size?: number;
  id: string;
}

export const PortfolioPieChart: React.FC<PortfolioLineChartProps> = ({
  size,
  id,
}) => {
  const portfolioItems = useSelector(
    (state: IRootState) => state.portfolio.portfolioData
  );

  useEffect(() => {
    portfolioItems.length > 0 ? drawChart() : null;
  }, [portfolioItems]);

  function drawChart() {
    d3.select(`#${id}1`).remove();

    const data = portfolioItems[0].portfolioItems.map(
      (item: IPortfolioItemView) => {
        return item.value.USD;
      }
    );

    console.log(data);
    var group: any = d3
      .select(`#${id}`)
      .append("svg")
      .attr("id", `${id}1`)
      .attr("width", size)
      .attr("height", size)
      .append("g")
      .attr("transform", `translate(${size / 2}, ${size / 2})`);

    var pieSegments = d3.pie()(data);

    var arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(size / 2)
      .startAngle((d: any) => d.startAngle)
      .endAngle((d: any) => d.endAngle);

    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    group
      .selectAll("path")
      .data(pieSegments)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (d: any, i: any) => colors(i));
  }

  return (
    <div id={`${id}`}>
      {!portfolioItems && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          <div>LOADING CHART...</div>
        </div>
      )}
    </div>
  );
};
