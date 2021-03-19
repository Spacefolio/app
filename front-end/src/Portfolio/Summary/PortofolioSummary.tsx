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

					<FlexCardHeader>
						<InlineDiv style={{ padding: '12px' }}>
							<div>
								<InlineDiv>
									<Typography variant="h2">Summary</Typography>
								</InlineDiv>
								<InlineDiv spacing={1}>
									<Typography variant="caption">
										Your portfolio at a glance
									</Typography>
								</InlineDiv>
							</div>
						</InlineDiv>
					</FlexCardHeader>
					<PortfolioSummaryItem
						timeframe={'24H'}
						portfolioItem={filteredPortfolio}
					/>
					<FlexCardHeader>
						<InlineDiv style={{ padding: '12px' }}>
							<div>
								<InlineDiv>
									<Typography variant="h2">Holdings</Typography>
								</InlineDiv>
								<InlineDiv spacing={1}>
									<Typography variant="caption">
										Your assets and their performance
									</Typography>
								</InlineDiv>
							</div>
						</InlineDiv>
					</FlexCardHeader>
					<Assets portfolioItems={filteredPortfolio.portfolioItems} />
					<FlexCardHeader>
						<InlineDiv style={{ padding: '12px' }}>
							<div>
								<InlineDiv>
									<Typography variant="h2">Strategies</Typography>
								</InlineDiv>
								<InlineDiv spacing={1}>
									<Typography variant="caption">
										All strategies running on this portfolio
									</Typography>
								</InlineDiv>
							</div>
						</InlineDiv>
					</FlexCardHeader>
					<Assets
						portfolioItems={filteredPortfolio.portfolioItems}
					/>
				</SummaryWrapper>
			) : (
				<Backdrop open>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
		</ThemeProvider>
	);
};
