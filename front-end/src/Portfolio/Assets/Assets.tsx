import React, { useState } from 'react';
import { AssetCard } from './Line_item/AssetCard';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../types';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../../_styles/Theme';
import ScrollContainer from 'react-indiana-drag-scroll';

const AssetContainer = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-auto-flow: column;
	grid-auto-columns: calc(50% - var(--gutter) * 2);
	padding: 10px;
	overflow-x: visible;
`;

interface IHoldingsProps {
	portfolioItems: IPortfolioItemView[];
}

export const Assets: React.FC<IHoldingsProps> = ({ portfolioItems }) => {
	return (
		<ThemeProvider theme={theme}>
			<div style={{ height: '500px', overflowY: 'visible' }}>
				<ScrollContainer className="scroll-container">
					<AssetContainer >
						{portfolioItems
							// .filter((item) => item.value.USD > 0)
							.map((item, index: number) => (
								<AssetCard portfolioItem={item} />
							))}
					</AssetContainer>
				</ScrollContainer>
			</div>
		</ThemeProvider>
	);
};
