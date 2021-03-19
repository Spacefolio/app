import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../_reducers';
import { PortfolioSummaryItem } from '../Portfolio';
import { useFilteredPortfolio } from '../_hooks/useFilteredPortfolio';
import { Grid, Typography } from '@material-ui/core';
import { portfolioActions } from '../_actions';
import { FlexCardHeader, InlineDiv } from '../_styles';

export const Dashboard = () => {
	const dispatch = useDispatch();

	const metaportfolioData = useFilteredPortfolio('ALL');

	useEffect(() => {
		dispatch(portfolioActions.refresh('ALL'));
	}, []);

	return (
		<React.Fragment>
			<Grid xs={12} container>
      <FlexCardHeader>
					<InlineDiv style={{ padding: '12px' }}>
						<div>
							<InlineDiv>
								<Typography variant="h2">All Assets</Typography>
							</InlineDiv>
							<InlineDiv spacing={1}>
								<Typography variant="caption">
									Your total performance
								</Typography>
							</InlineDiv>
						</div>
					</InlineDiv>
				</FlexCardHeader>
				<PortfolioSummaryItem portfolioItem={metaportfolioData} />
			</Grid>
		</React.Fragment>
	);
};
