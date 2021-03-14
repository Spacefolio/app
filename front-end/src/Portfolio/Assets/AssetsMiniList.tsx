import React, { useState } from 'react';
import { IPortfolioItemView } from '../../../../types';
import { ViewLoading } from '../../_components';
import { ScrollBox } from '../../_styles';
import { AssetsMiniItem } from './Line_item/AssetsMiniItem';

interface AssetsMiniListProps {
	portfolioItems: IPortfolioItemView[];
}

export const AssetsMiniList: React.FC<AssetsMiniListProps> = ({
	portfolioItems,
}) => {
	const sortHoldings = portfolioItems.sort(
		(a: any, b: any) => b['value'].USD - a['value'].USD
	);

	return (
		<ScrollBox style={{ padding: '0 8px', minWidth: '400px' }}>
			{portfolioItems ? (
				sortHoldings.map((pItem: IPortfolioItemView) => (
					<AssetsMiniItem portfolioItem={pItem} />
				))
			) : (
				<ViewLoading />
			)}
		</ScrollBox>
	);
};
