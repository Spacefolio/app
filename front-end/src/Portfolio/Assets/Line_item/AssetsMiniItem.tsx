import { Avatar, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../../types';
import { FlexSpacer, InlineDiv } from '../../../_styles';
import { COLORS, SPACING } from '../../../_styles/ResponsiveDesign';
import {
	DataWrapper,
	DesktopWrapper,
	HoldingDesktopWrapper,
	MobileWrapper,
} from '../../../_styles/TabularStyles';
import {
	ProfitColorizer,
	ReformatAmountValue,
	ReformatCurrencyValue,
	ReformatCurrencyValueMini,
} from '../../../_helpers/formating';
import { theme } from '../../../_styles/Theme';

interface AssetsMiniItemProps {
	portfolioItem: IPortfolioItemView;
	color: string;
}

export const AssetsMiniItem: React.FC<AssetsMiniItemProps> = ({
	portfolioItem,
	color,
}) => {
	const {
		asset,
		amount,
		value,
		profitTotal,
		currentPrice,
		profitPercentage,
	} = portfolioItem;

	const avatarSize = parseInt(SPACING.flexCardGap) * 2.5 + 'px';

	const NameSection = () => {
		return (
			<InlineDiv spacing={1}>
				<Avatar
					style={{ width: avatarSize, height: avatarSize }}
					src={asset.logoUrl}
				/>
			</InlineDiv>
		);
	};

	const AmountSection = () => {
		return (
			<Typography>{ReformatCurrencyValue(amount, asset.symbol)}</Typography>
		);
	};

	const CurrentPriceSection = () => {
		return (
			<Typography>{ReformatCurrencyValue(currentPrice, 'USD')}</Typography>
		);
	};
	const ValueSection = () => {
		return (
			<Typography variant="body2">
				{ReformatCurrencyValueMini(value.USD)}
			</Typography>
		);
	};
	const ProfitSection = () => {
		return (
			<React.Fragment>
				<Typography style={{ color: ProfitColorizer(profitTotal.all) }}>
					${profitTotal.all.toFixed(2)}
				</Typography>
				<Typography style={{ color: ProfitColorizer(profitPercentage.all) }}>
					{profitPercentage.all.toFixed(2)}%
				</Typography>
			</React.Fragment>
		);
	};

	return (
		<InlineDiv style={{ padding: '5px 0', gap: '5px' }}>
			{NameSection()}{' '}
			<div
				style={{
					height: '10px',
					width: '100%',
					borderRadius: '50px',
					background: color,
				}}
			></div>
			{ValueSection()}
		</InlineDiv>
	);
};
