import React, { useState } from 'react';
import { IPortfolioItemView } from '../../../../types';
import { ViewLoading } from '../../_components';
import { ScrollBox } from '../../_styles';
import { AssetsMiniItem } from './Line_item/AssetsMiniItem';

interface AssetsMiniListProps {
	portfolioItems: IPortfolioItemView[];
	colors: string[];
}

export const AssetsMiniList: React.FC<AssetsMiniListProps> = ({
	portfolioItems,
	colors,
}) => {
	const sortHoldings = portfolioItems.sort(
		(a: any, b: any) => b['value'].USD - a['value'].USD
	);

	return (
		<ScrollBox
			style={{
				padding: '0 8px',
				width: '100%',
			}}
		>
			{portfolioItems ? (
				sortHoldings
					.filter((item) => item.value.USD > 0)
					.map((pItem: IPortfolioItemView, index) => (
						<AssetsMiniItem
							key={index}
							color={colors[index]}
							portfolioItem={pItem}
						/>
					))
			) : (
				<ViewLoading />
			)}
		</ScrollBox>
	);
};
