// import React, { useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { ViewLoading } from "../..";
// import { timeframe, IPortfolioLineChartItem } from "../../../../../types";

// interface TestChartProps {}

// interface PortfolioLineChartProps {
//   setPV?: React.Dispatch<any>;
//   setDate?: React.Dispatch<any>;
//   width: number;
//   height: number;
//   id: string;
//   yAxis?: boolean;
//   xAxis?: boolean;
//   timeframe?: timeframe;
//   data: IPortfolioLineChartItem[];
// }

// export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = ({
//   setPV,
//   setDate,
//   height,
//   timeframe,
//   width,
//   id,
//   xAxis = false,
//   yAxis = false,
//   data,
// }) => {
//   // useEffect(() => {
//   //   data && drawBasicChart();
//   // }, [data, width, height]);

//   // const margin = {
//   //   top: 5,
//   //   bottom: xAxis ? 30 : 5,
//   //   left: yAxis ? 80 : 0,
//   //   right: 0,
//   // };

//   // interface IChartPoint {
//   //   T: number;
//   //   USD: number;
//   // }

//   // const drawBasicChart = () => {
//   //   var ctx = document.getElementById(id).getContext("2d");
//   //   var chart = new Chart(ctx, {
//   //     // The type of chart we want to create
//   //     type: "line",

//   //     // The data for our dataset
//   //     data: {
//   //       labels: [
//   //         "January",
//   //         "February",
//   //         "March",
//   //         "April",
//   //         "May",
//   //         "June",
//   //         "July",
//   //       ],
//   //       datasets: [
//   //         {
//   //           label: "My First dataset",
//   //           backgroundColor: "rgb(255, 99, 132)",
//   //           borderColor: "rgb(255, 99, 132)",
//   //           data: [0, 10, 5, 2, 20, 30, 45],
//   //         },
//   //       ],
//   //     },

//   //     // Configuration options go here
//   //     options: {},
//   //   });
//   // };

//   const chartOptions = {
//     scales: {
//       xAxes: [
//         {
//           ticks: {
//             callback: function (label: any) {
//               return label.toFixed(2) + "%";
//             },
//           },
//         },
//       ],
//       yAxes: [
//         {
//           ticks: {
//             callback: function (label: any) {
//               return label;
//             },
//             fontSize: 10,
//             fontColor: "black",
//           },
//           display: true,
//         },
//       ],
//     },
//     maintainAspectRatio: false,
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: 0,
//         margin: 0,
//         width: `${width}px`,
//         height: `${height}px`,
//       }}
//     >
//       {!(data.length > 0) ? (
//         <ViewLoading />
//       ) : (
//         <Line
//           data={data}
//           height={height}
//           width={width}
//           options={chartOptions}
//         />
//       )}
//     </div>
//   );
// };
