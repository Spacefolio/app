import { Container, Avatar, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView } from '../../../../../types';
import { alertActions } from '../../../_actions';
import { applicationViewActions } from '../../../_actions/applicationView.actions';
import { PortfolioLineChart } from '../../../_components';
import { portfolioService } from '../../../_services';
import { FlexCard, BaseButton, InlineDiv } from '../../../_styles';
import { AddTransactionForm } from '../../Transactions/Add/AddTransactionForm';
import useDimensions from 'react-use-dimensions';
import { Assets } from '../..';

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
			.catch((err) => {
				dispatch(alertActions.error(err));
			});
	}, []);

	return (
		<FlexCard>
			<Container>
				<BaseButton
					onClick={() =>
						dispatch(
							applicationViewActions.setModal(
								true,
								<AddTransactionForm />,
								'Add Transaction'
							)
						)
					}
				>
					Add Transaction
				</BaseButton>
				<InlineDiv style={{ gridArea: 'name' }}>
					<Avatar src={logoUrl} />
					<Typography>{nickname}</Typography>
				</InlineDiv>

				<div
					style={{ gridArea: 'chart', overflowX: 'hidden' }}
					ref={chartContainerRef}
				>
					<PortfolioLineChart
						id={'test'}
						timeframe={'ALL'}
						data={chartData}
						width={width}
						yAxis={false}
						xAxis={true}
						height={200}
					/>
				</div>
				<Assets portfolioItems={portfolioItems} />
			</Container>
		</FlexCard>
	);
};
