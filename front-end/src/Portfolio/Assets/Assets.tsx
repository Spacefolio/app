import React, { useState } from 'react';
import { AssetItem } from './Line_item/AssetItem';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../types';
import { TableCellStyled } from '../Filter/Styles';
import { SPACING } from '../../_styles';

interface IHoldingsProps {
	portfolioItems: IPortfolioItemView[];
}

export const Assets: React.FC<IHoldingsProps> = ({ portfolioItems }) => {
	return (
		<div style={{gap: SPACING.flexCardGap, display: 'flex'}}>
			{portfolioItems
				.filter((item) => item.value.USD > 0)
				.map((item, index: number) => (
					<AssetItem key={index} portfolioItem={item} />
				))}
		</div>
	);
};
