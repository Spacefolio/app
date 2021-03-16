import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../_reducers';
import { PortfolioSummaryItem } from '../Portfolio';
import { useFilteredPortfolio } from '../_hooks/useFilteredPortfolio';
import { Grid } from '@material-ui/core';
import { portfolioActions } from '../_actions';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const portfolios = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const metaportfolioData = useFilteredPortfolio(
		portfolios.length > 0 && 'ALL'
	);

	useEffect(() => {
		dispatch(portfolioActions.refresh('ALL'));
	}, []);

	return (
		<React.Fragment>
			<Grid xs={12} container>
				<PortfolioSummaryItem portfolioItem={metaportfolioData} />
			</Grid>
		</React.Fragment>
	);
};
