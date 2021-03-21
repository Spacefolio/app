import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { IPortfolioItemView } from '../../../../../types';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';
import { AssetsMiniList } from '../../../Portfolio/Assets/AssetsMiniList';
import { ChartTooltipModel } from 'chart.js';
import { ReformatCurrencyValueMini } from '../../../_helpers';

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
	const [chartData, setChartData] = useState<any>({});

	const [calcTotal, setcalcTotal] = useState<string>('');

	const [pieDisplaySymbol, setPieDisplaySymbol] = useState('');
	const [pieDisplayValue, setPieDisplayValue] = useState('');

	useEffect(() => {
		var total = 0;
		data.map((item) => {
			total += item.value.USD;
		});
		setChartData({
			labels: data.map((item) => item.asset.name),
			datasets: [
				{
					hoverBorderWidth: 2,
					hoverBorderColor: 'black',
					backgroundColor: colors,
					data: data.map((item) => item.value.USD),
				},
			],
		});
	}, [data]);

	const testColors = [
		'rgb(211, 241, 210)',
		'rgb(144, 204, 222)',
		'rgb(160, 155, 204)',
		'rgb(203, 166, 204)',
		'rgb(243, 198, 209)',
		'rgb(253, 218, 223)',
	];

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
							custom: (tooltipModel: ChartTooltipModel) => {
								if (tooltipModel.body) {
									const splitBody = tooltipModel.body[0].lines[0].split(':');
									const value = splitBody[1];
									const symbol = splitBody[0];
									setPieDisplaySymbol(symbol);
									setPieDisplayValue(
										ReformatCurrencyValueMini(parseFloat(value))
									);
								} else {
									setPieDisplayValue('');
									setPieDisplaySymbol('');
								}
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
						margin: '25%',
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Typography gutterBottom variant="h2" align="center">
						{pieDisplaySymbol}
					</Typography>
					<Typography align="center">{pieDisplayValue}</Typography>
				</div>
			</div>
		</React.Fragment>
	);
};
