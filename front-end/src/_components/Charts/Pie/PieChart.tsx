import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { IPortfolioItemView } from '../../../../../types';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

interface PortfolioLineChartProps {
	size?: number;
	data: IPortfolioItemView[];
	id: string;
	colors: string[];
}

export const PortfolioPieChart: React.FC<PortfolioLineChartProps> = ({
	size,
	id,
	data,
	colors,
}) => {
	const [chartData, setChartData] = useState<any>();

	const [pieDisplay, setPieDisplay] = useState('');

	useEffect(() => {
		setChartData({
			labels: data.map((item) => item.asset.name),
			datasets: [
				{
					backgroundColor: colors,
					data: data.map((item) => item.value.USD),
				},
			],
		});
	}, [data]);

	return (
		<React.Fragment>
			<div style={{ position: 'relative', height: size, width: size }}>
				<Doughnut
					height={size}
					width={size}
					data={chartData}
					options={{
						tooltips: {
							enabled: false,
							custom: (tooltipModel) => {
								setPieDisplay(
									tooltipModel.dataPoints.map((point) => point.label)[0]
								);
							},
						},
						cutoutPercentage: 70,
						legend: {
							display: false,
						},
					}}
				/>
				<div
					style={{
						boxSizing: 'border-box',
						position: 'absolute',
						bottom: 0,
						top: 0,
						right: 0,
						left: 0,
						margin: '20%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography align="center">{pieDisplay}</Typography>
				</div>
			</div>
		</React.Fragment>
	);
};
