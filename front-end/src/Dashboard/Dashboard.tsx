import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../_reducers';
import { PortfolioSummaryItem } from '../Portfolio';
import { useFilteredPortfolio } from '../_hooks/useFilteredPortfolio';
import { Typography } from '@material-ui/core';
import { portfolioActions } from '../_actions';
import { CardHeader, FlexCardHeader, InlineDiv } from '../_styles';
import { DashboardWrapper } from './_styles';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const metaportfolioData = useFilteredPortfolio('ALL');

	useEffect(() => {
		dispatch(portfolioActions.refresh('ALL'));
	}, []);

	return (
		<React.Fragment>
			<DashboardWrapper>
				{/* {CardHeader('All Assets', 'Your total performance')} */}
				<PortfolioSummaryItem portfolioItem={metaportfolioData} />

			</DashboardWrapper>
		</React.Fragment>
	);
};
