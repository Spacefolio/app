import {
	Backdrop,
	Chip,
	CircularProgress,
	Fab,
	Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { IPortfolioItem } from '../../../../back-end/src/portfolios/portfolio.model';
import { IPortfolioDataView, ITimeframe } from '../../../../types';
import {
	ActionButton,
	FlexCard,
	FlexCardContent,
	FlexCardHeader,
	FlexSpacer,
	InlineDiv,
} from '../../_styles';
import { theme } from '../../_styles/Theme';
import { IRootState } from '../../_reducers';
import { PortfolioSummaryItem } from './Line_item/PortfolioSummaryItem';
import { SummaryWrapper } from './Line_item/_styles';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';
import { Assets } from '../Assets/Assets';
import { Transactions } from '..';

export const PortfolioSummary = () => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const [filterId, setFilterId] = useState('ALL');

	const filteredPortfolio = useFilteredPortfolio(filterId);

	return (
		<ThemeProvider theme={theme}>
			{filteredPortfolio ? (
				<SummaryWrapper>
					<InlineDiv style={{ padding: '12px' }}>
						{portfolioData.map((item, index) => (
							<div key={index} onClick={() => setFilterId(item.id)}>
								{item.name}
							</div>
						))}
						<FlexSpacer />
					</InlineDiv>
					{CardHeader('Summary', 'Your portfolio at a glance')}
					<PortfolioSummaryItem
						timeframe={'24H'}
						portfolioItem={filteredPortfolio}
					/>

					{CardHeader('Holdings', 'Your assets and their performance')}
					<Assets portfolioItems={filteredPortfolio.portfolioItems} />

					{CardHeader('Strategies', 'All strategies running on this portfolio')}
					<Assets portfolioItems={filteredPortfolio.portfolioItems} />

					{/* {CardHeader('Transactions', 'Your completed transactions')}
					<Transactions transactions={filteredPortfolio.transactions} /> */}
				</SummaryWrapper>
			) : (
				<Backdrop open>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
		</ThemeProvider>
	);
};

function CardHeader(title: string, caption: string) {
	return (
		<FlexCardHeader>
			<InlineDiv style={{ padding: '12px' }}>
				<div>
					<InlineDiv>
						<Typography variant="h2">{title}</Typography>
					</InlineDiv>
					<InlineDiv spacing={1}>
						<Typography variant="caption">{caption}</Typography>
					</InlineDiv>
				</div>
			</InlineDiv>
		</FlexCardHeader>
	);
}
