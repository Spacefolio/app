import {
	Container,
	Avatar,
	Typography,
	Grid,
	Hidden,
	CircularProgress,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView } from '../../../../../types';
import { alertActions, portfolioActions } from '../../../_actions';

import { SimpleTimeSeries, PortfolioPieChart } from '../../../_components';
import { portfolioService } from '../../../_services';
import {
	FlexCard,
	ActionButton,
	InlineDiv,
	FlexCardContent,
	FlexCardHeader,
	FlexSpacer,
} from '../../../_styles';

import useDimensions from 'react-use-dimensions';

import { AssetsMiniList } from '../../Assets/AssetsMiniList';

import { SyncIcon } from '../../../_styles/IconStyles';
import { useFilteredPortfolio } from '../../../_hooks/useFilteredPortfolio';

export interface IPortfolioSummaryItemView {
	portfolioItem: IPortfolioDataView;
}

export const PortfolioSummaryItem: React.FC<IPortfolioSummaryItemView> = ({
	portfolioItem,
	...props
}) => {
	const dispatch = useDispatch();

	const [chartData, setChartData] = useState([]);

	const [chartContainerRef, { width }] = useDimensions();

	useEffect(() => {
		setChartData([]);
		portfolioItem &&
			portfolioService
				.getPortfolioChartData('ALL', portfolioItem.id)
				.then((res) => {
					setChartData(res);
				})
				.catch((error: Error) => {
					dispatch(alertActions.error(error.message));
				});
	}, [portfolioItem]);

	const testColors = [
		'#B21F00',
		'#6800B4',
		'#C9DE00',
		'#2FDE00',
		'#00A6B4',
		'pink',
	];

	const Content = () => (
		<React.Fragment>
			<FlexCardHeader>
				<InlineDiv style={{ padding: '12px' }}>
					<div>
						<InlineDiv>
							<Typography variant="h2">{portfolioItem.nickname}</Typography>
						</InlineDiv>
						<InlineDiv spacing={1}>
							<Avatar
								style={{ width: '15px', height: '15px' }}
								src={portfolioItem.logoUrl}
							/>
							<Typography variant="caption">{portfolioItem.name}</Typography>
						</InlineDiv>
					</div>
					<FlexSpacer />
				</InlineDiv>
			</FlexCardHeader>
			<FlexCardContent>
				<Grid xs={12} container>
					<Grid justify="center" alignItems="center" xs={12} container>
						<Typography
							style={{
								fontWeight: 700,
								fontSize: '2.125rem',
								lineHeight: '2.5rem',
							}}
						>
							{portfolioItem.portfolioTotal.USD.toFixed(2)} USD
						</Typography>
						<SyncIcon
							onClick={() =>
								dispatch(portfolioActions.refresh(portfolioItem.id, true))
							}
						/>
					</Grid>
					<Grid
						ref={chartContainerRef}
						alignItems="center"
						justify="center"
						xs={12}
						sm={4}
						container
					>
						<Grid ref={chartContainerRef} xs>
							<SimpleTimeSeries
								showX={false}
								showY={false}
								id={portfolioItem.nickname.replace(/\s/g, '') + 'chart'}
								data={chartData}
								width={width}
								height={150}
							/>
						</Grid>
					</Grid>
					<Hidden xsDown>
						<Grid container alignItems="center" justify="center" sm={4}>
							<PortfolioPieChart
								colors={testColors}
								data={portfolioItem.portfolioItems}
								size={150}
								id={portfolioItem.nickname.replace(/\s/g, '') + 'pie'}
							/>
						</Grid>
					</Hidden>
					<Grid alignItems="center" justify="center" xs={12} sm={4} container>
						<AssetsMiniList
							colors={testColors}
							portfolioItems={portfolioItem.portfolioItems}
						/>
					</Grid>
				</Grid>
			</FlexCardContent>
		</React.Fragment>
	);

	return (
		<FlexCard {...props} fullWidth>
			{portfolioItem && Content()}
		</FlexCard>
	);
};
