import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../_reducers';
import { PortfolioSummaryItem } from '../Portfolio';
import { useFilteredPortfolio } from '../_hooks/useFilteredPortfolio';
import { Grid } from '@material-ui/core';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const portfolios = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const metaportfolioData = useFilteredPortfolio(
		portfolios.length > 0 && portfolios[0].id
	);

	return (
		<React.Fragment>
			<Grid xs={12} container>
				<PortfolioSummaryItem portfolioItem={metaportfolioData} />
			</Grid>
		</React.Fragment>
	);
};
