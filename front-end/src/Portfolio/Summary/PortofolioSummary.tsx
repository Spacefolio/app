import { Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { IPortfolioItem } from '../../../../back-end/src/portfolios/portfolio.model';
import { IPortfolioDataView } from '../../../../types';
import { ActionButton, InlineDiv } from '../../_styles';
import { theme } from '../../_styles/Theme';
import { IRootState } from '../../_reducers';
import { PortfolioSummaryItem } from './Line_item/PortfolioSummaryItem';
import { SummaryWrapper } from './Line_item/_styles';

export const PortfolioSummary = () => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.PortfolioData
	);

	return (
		<ThemeProvider theme={theme}>
			<SummaryWrapper>
				<InlineDiv style={{ padding: '12px' }}>
					<Typography variant="subtitle2">Your Portolios</Typography>
				</InlineDiv>
				{portfolioData.map((portfolio: IPortfolioDataView, index: number) => {
					return <PortfolioSummaryItem key={index} data={portfolio} />;
				})}
			</SummaryWrapper>
		</ThemeProvider>
	);
};
