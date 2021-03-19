import React, { useState } from 'react';
import { AssetItem } from './Line_item/AssetItem';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../types';
import { TableCellStyled } from '../Filter/Styles';
import { FlexCard, SPACING } from '../../_styles';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../_styles/Theme';
import { Grid, GridList, GridListTile } from '@material-ui/core';

const AssetContainer = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-auto-flow: column;
	grid-auto-columns: calc(50% - var(--gutter) * 2);
	padding: 10px;
	overflow-x: scroll;
	scrollbar-width: none;
	::-webkit-scrollbar {
		display: none;
	}
`;

interface IHoldingsProps {
	portfolioItems: IPortfolioItemView[];
}

export const Assets: React.FC<IHoldingsProps> = ({ portfolioItems }) => {
	return (
		<ThemeProvider theme={theme}>
			<div style={{ height: '500px', overflowY: 'visible' }}>
				<AssetContainer>
					{portfolioItems
						.filter((item) => item.value.USD > 0)
						.map((item, index: number) => (
							<AssetItem portfolioItem={item} />
						))}
				</AssetContainer>
			</div>
		</ThemeProvider>
	);
};
