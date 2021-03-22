import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../types';
import { PortfolioPieChart } from '../../_components';
import { FlexCard, FlexCardHeader } from '../../_styles';
import { AssetsMiniList } from './AssetsMiniList';

interface AssetAllocationsProps {
	data: IPortfolioDataView;
}

const testColors = [
	'rgb(211, 241, 210)',
	'rgb(144, 204, 222)',
	'rgb(160, 155, 204)',
	'rgb(203, 166, 204)',
	'rgb(243, 198, 209)',
	'rgb(253, 218, 223)',
];

export const AssetAllocations: React.FC<AssetAllocationsProps> = ({ data }) => {
	return (
		<FlexCard disableGutters style={{ gridArea: 'allocations' }}>
			<FlexCardHeader
				style={{
					height: '60px',
					borderBottom: '1px solid rgb(236, 239, 241)',
				}}
			>
				<Typography variant="h3">Allocations</Typography>
			</FlexCardHeader>
			<Grid alignItems="center" justify="center" container xs={12}>
				<Grid
					container
					alignItems="center"
					justify="center"
					item
					xs={6}
					md={12}
				>
					<PortfolioPieChart
						colors={testColors}
						data={data.portfolioItems}
						id={data.nickname.replace(/\s/g, '') + 'pie'}
					/>
				</Grid>

				<Grid item xs={6} md={12}>
					<AssetsMiniList
						colors={testColors}
						portfolioItems={data.portfolioItems}
					/>
				</Grid>
			</Grid>
		</FlexCard>
	);
};
