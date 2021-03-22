import React, { useState } from 'react';
import { AssetCard } from './Line_item/AssetCard';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../_styles/Theme';
import ScrollContainer from 'react-indiana-drag-scroll';
import { FlexCard, FlexCardHeader } from '../../_styles';
import { Typography } from '@material-ui/core';

const AssetContainer = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-auto-flow: column;
	grid-auto-columns: auto;
	padding: 10px;
`;

interface IHoldingsProps {
	portfolioItems: IPortfolioItemView[];
}

export const Assets: React.FC<IHoldingsProps> = ({ portfolioItems }) => {
	return (
		<ThemeProvider theme={theme}>
			<FlexCard style={{ gridArea: 'holdings' }} disableGutters>
				<FlexCardHeader
					style={{
						height: '60px',
						borderBottom: '1px solid rgb(236, 239, 241)',
					}}
				>
					<Typography gutterBottom variant="h3">
						Holdings
					</Typography>
				</FlexCardHeader>
				<ScrollContainer className="scroll-container">
					<AssetContainer>
						{portfolioItems
							// .filter((item) => item.value.USD > 0)
							.map((item, index: number) => (
								<AssetCard portfolioItem={item} />
							))}
					</AssetContainer>
				</ScrollContainer>
			</FlexCard>
		</ThemeProvider>
	);
};
