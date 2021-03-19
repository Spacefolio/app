import React, { useEffect, useState, useRef } from 'react';
import { IPortfolioLineChartItem, ITimeframe } from '../../../../../types';
import Chart from 'chart.js';
import { theme } from '../../../_styles/Theme';
import { CircularProgress } from '@material-ui/core';
import moment from 'moment';
import { InlineDiv } from '../../../_styles';

interface PortfolioLineChartProps {
	id: string;
	data: IPortfolioLineChartItem[];
	showX?: boolean;
	showY?: boolean;
	height?: number;
	width?: number;
	showTooltip?: boolean;
}

export const SimpleTimeSeries: React.FC<PortfolioLineChartProps> = ({
	id,
	height,
	width,
	showX = true,
	showY = true,
	showTooltip = true,
	data: chartData,
}) => {
	const chartRef: any = useRef();

	useEffect((): any => {
		if (chartData != null && chartData.length > 0) {
			const myChartRef = chartRef.current.getContext('2d');

			const chart = new Chart(myChartRef, {
				type: 'line',
				data: {
					labels: chartData.map((item) => item.T),
					datasets: [
						{
							borderColor: theme.palette.primary.main,
							borderWidth: 1,
							fill: false,
							pointRadius: 0,
							pointHitRadius: 5,
							pointHoverRadius: 3,
							data: chartData.map((item) => item.USD),
						},
					],
				},
				options: {
					tooltips: { enabled: showTooltip, intersect: true },
					title: { display: false },
					legend: { display: false },
					maintainAspectRatio: false,
					hover: { mode: 'nearest', intersect: true },
					scales: {
						xAxes: [
							{
								offset: true,
								ticks: {
									padding: -20,
									maxRotation: 0,
									minRotation: 0,
									fontSize: 10,
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
									fontSize: 10,

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
		}
	}, [chartData]);

	interface IChartPoint {
		T: number;
		USD: number;
	}

	return (
		<React.Fragment>
			<div
				style={{
					position: 'relative',
					height: height ? height + 'px' : 'inherit',
					width: width ? width + 'px' : 'inherit',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{chartData != null ? (
					chartData.length > 0 ? (
						<canvas id={id} ref={chartRef} />
					) : (
						'there was a problem loading chart data'
					)
				) : (
					<CircularProgress />
				)}
			</div>
		</React.Fragment>
	);
};
