import React, { useEffect, useState } from "react";
import useDimensions from 'react-use-dimensions';
import "./Chart.scss";
import CandleStickChart from "./Test";
import CandleStickChartWithDarkTheme from "./test2";
import MSFT from "../public/MSFT.tsv";
import { tsvParse, csvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const parseData = (parse) => {
  return function (d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
};

const parseDate = timeParse("%Y-%m-%d");

function parseFile() {
  const promiseMSFT = fetch(
    "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv"
  )
    .then((response) => response.text())
    .then((data) => tsvParse(data, parseData(parseDate)));
  return promiseMSFT;
}

export const Chart = () => {
  const [tickData, setTickData] = useState();
  const [ref, refSize] = useDimensions();

  useEffect(() => {
    parseFile().then((data) => {
      setTickData(data);
    });
  }, []);

  return (
    <div className="trade-panel-container chart-container">
      <div className="trade-panel-header-bar">
        <div>Price Chart</div>
      </div>
      <div className="chart-display-container"
      ref={(ref)}
      >
        {tickData != undefined ? (
          <CandleStickChartWithDarkTheme type={"hybrid"} data={tickData} height={refSize.height}/>
        ) : (
          <div className="center-my-children">Loading...</div>
        )}
      </div>
    </div>
  );
};
