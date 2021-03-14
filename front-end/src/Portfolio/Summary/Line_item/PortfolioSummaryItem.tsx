import { Container, Avatar, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView } from '../../../../../types';
import { alertActions } from '../../../_actions';
import { applicationViewActions } from '../../../_actions/applicationView.actions';
import { PortfolioLineChart, PortfolioPieChart } from '../../../_components';
import { portfolioService } from '../../../_services';
import {
	FlexCard,
	ActionButton,
	InlineDiv,
	FlexCardContent,
	FlexCardHeader,
	FlexSpacer,
} from '../../../_styles';
import { AddTransactionForm } from '../../Transactions/Add/AddTransactionForm';
import useDimensions from 'react-use-dimensions';
import { Assets } from '../..';
import { AssetsMiniList } from '../../Assets/AssetsMiniList';

interface IPortfolioSummaryItemView {
	data: IPortfolioDataView;
}

export const PortfolioSummaryItem: React.FC<IPortfolioSummaryItemView> = ({
	data,
}) => {
	const {
		name,
		id,
		nickname,
		addedDate,
		exchangeType,
		logoUrl,
		portfolioItems,
		profitPercentage,
		profitTotal,
		portfolioTotal,
	} = data;

	const dispatch = useDispatch();

	const [chartData, setChartData] = useState([]);

	const [chartContainerRef, { width }] = useDimensions();

	useEffect(() => {
		setChartData([]);
		portfolioService
			.getPortfolioChartData('ALL', id)
			.then((res) => {
				setChartData(res);
			})
			.catch((error: Error) => {
				dispatch(alertActions.error(error.message));
			});
	}, []);

	return (
		<FlexCard>
			<FlexCardHeader>
				<InlineDiv style={{ padding: '12px' }}>
					<InlineDiv>
						<Avatar color="black" src={logoUrl} sizes="small" />
						<Typography variant="h2">{nickname}</Typography>
					</InlineDiv>
					<FlexSpacer />
				</InlineDiv>
			</FlexCardHeader>
			<FlexCardContent justifyContent="space-between" flexDirection="row">
				<InlineDiv
					style={{
						overflow: 'hidden',
						maxHeight: '200px',
						minWidth: '500px',
					}}
					ref={chartContainerRef}
				>
					<PortfolioLineChart
						id={nickname.replace(/\s/g, '') + 'chart'}
						timeframe={'ALL'}
						data={chartData}
						width={width}
						yAxis={false}
						xAxis={true}
						height={200}
					/>
				</InlineDiv>
				<InlineDiv
					style={{
						overflow: 'hidden',
						minWidth: '200px',
					}}
				>
					<PortfolioPieChart
						data={portfolioItems}
						size={180}
						id={nickname.replace(/\s/g, '') + 'pie'}
					/>
				</InlineDiv>

				<AssetsMiniList portfolioItems={portfolioItems} />
			</FlexCardContent>
		</FlexCard>
	);
};
