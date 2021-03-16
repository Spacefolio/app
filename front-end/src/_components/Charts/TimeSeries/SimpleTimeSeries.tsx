import React, { useEffect, useState, useRef } from 'react';
import { IPortfolioLineChartItem, timeframe } from '../../../../../types';
import Chart from 'chart.js';
import { theme } from '../../../_styles/Theme';

interface PortfolioLineChartProps {
	width: number;
	height: number;
	id: string;
	data: IPortfolioLineChartItem[];
	showX?: boolean;
	showY?: boolean;
	showTooltip?: boolean;
}

export const SimpleTimeSeries: React.FC<PortfolioLineChartProps> = ({
	height,
	width,
	id,
	showX = true,
	showY = true,
	showTooltip = true,
	data: chartData,
}) => {
	const chartRef: any = useRef();

	useEffect(() => {
		const myChartRef = chartRef.current.getContext('2d');

		const chart = new Chart(myChartRef, {
			type: 'line',
			data: {
				labels: chartData.map((item) => item.T),
				datasets: [
					{
						borderColor: theme.palette.primary.main,
						fill: false,
						pointRadius: 0,
						data: chartData.map((item) => item.USD),
					},
				],
			},
			options: { 
				tooltips: { enabled: showTooltip },
				title: { display: false },
				legend: { display: false },
				maintainAspectRatio: false,
				hover: { mode: 'nearest', intersect: true },
				scales: {
					xAxes: [
						{
							ticks: {
								fontSize: 12,
								autoSkipPadding: 50,
							},
							gridLines: { display: false, drawBorder: false },
							type: 'time',
							display: showX,
							scaleLabel: {
								display: false,
							},
						},
					],
					yAxes: [
						{
							ticks: {
								autoSkipPadding: 50,
								display: true,
								callback: (value, index, values) => {
									return value;
								},
							},
							gridLines: { drawBorder: false },
							display: showY,
							scaleLabel: {
								display: false,
							},
						},
					],
				},
			},
		});
    return() => chart.destroy();
	}, [chartData]);

	interface IChartPoint {
		T: number;
		USD: number;
	}

	return (
		<React.Fragment>
			<div style={{ position: "relative" }}>
				{chartData && <canvas id={id} ref={chartRef} />}
			</div>
		</React.Fragment>
	);
};
