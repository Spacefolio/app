import React, { useEffect, useState, useRef } from 'react';
import { IPortfolioLineChartItem, timeframe } from '../../../../../types';
import Chart from 'chart.js';
import { theme } from '../../../_styles/Theme';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';

interface PortfolioLineChartProps {
	id: string;
	data: IPortfolioLineChartItem[];
	showX?: boolean;
	showY?: boolean;
	showTooltip?: boolean;
}

export const SimpleTimeSeries: React.FC<PortfolioLineChartProps> = ({
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
				tooltips: { enabled: showTooltip, intersect: false, mode: 'x' },
				title: { display: false },
				legend: { display: false },
				maintainAspectRatio: false,
				hover: { mode: 'nearest', intersect: true },
				scales: {
					xAxes: [
						{
							ticks: {
								maxRotation: 0,
								minRotation: 0,
								fontSize: 12,
								autoSkipPadding: 90,
							},
							gridLines: { display: false, drawBorder: true },
							type: 'time',
							display: showX,
							scaleLabel: {
								display: true,
							},
						},
					],
					yAxes: [
						{
							ticks: {
								autoSkipPadding: 80,
								display: true,
								callback: (value, index, values) => {
									return value;
								},
							},
							gridLines: { display: false, drawBorder: false },
							display: showY,
							scaleLabel: {
								display: false,
							},
						},
					],
				},
			},
		});
		return () => chart.destroy();
	}, [chartData]);

	interface IChartPoint {
		T: number;
		USD: number;
	}

	return (
		<React.Fragment>
			<div style={{ position: 'relative' }}>
				{chartData ? <canvas id={id} ref={chartRef} /> : <CircularProgress />}
			</div>
		</React.Fragment>
	);
};
