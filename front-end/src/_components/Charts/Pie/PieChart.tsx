import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import './PieChart.scss';
import { IPortfolioItemView } from '../../../../../types';
import { Doughnut } from 'react-chartjs-2';

interface PortfolioLineChartProps {
	size?: number;
	data: IPortfolioItemView[];
	id: string;
}

export const PortfolioPieChart: React.FC<PortfolioLineChartProps> = ({
	size,
	id,
	data,
}) => {
	const [chartData, setChartData] = useState<any>();

	useEffect(() => {
		setChartData({
			labels: data.map((item) => item.asset.name),
			datasets: [
				{
					backgroundColor: [
						'#B21F00',
						'#C9DE00',
						'#2FDE00',
						'#00A6B4',
						'#6800B4',
					],
					hoverBackgroundColor: [
						'#501800',
						'#4B5000',
						'#175000',
						'#003350',
						'#35014F',
					],
					data: data.map((item) => item.value.USD),
				},
			],
		});
	}, [data, size]);

	return (
		<div id={`${id}`}>
			{!data ? (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: `${size}px`,
						height: `${size}px`,
					}}
				>
					<div>LOADING CHART...</div>
				</div>
			) : (
				<Doughnut
					data={chartData}
					width={size}
					height={size}
					options={{
						legend: {
							display: false,
						},
					}}
				/>
			)}
		</div>
	);
};
