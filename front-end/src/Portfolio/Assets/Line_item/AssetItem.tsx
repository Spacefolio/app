import { Avatar, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import { IPortfolioDataView, IPortfolioItemView } from '../../../../../types';
import { InlineDiv } from '../../../_styles';
import { COLORS } from '../../../_styles/ResponsiveDesign';
import {
	DataWrapper,
	DesktopWrapper,
	HoldingDesktopWrapper,
	MobileWrapper,
} from '../../../_styles/TabularStyles';
import {
	ReformatAmountValue,
	ReformatCurrencyValue,
} from '../../../_helpers/formating';
import { theme } from '../../../_styles/Theme';

interface HoldingItemProps {
	portfolioItem: IPortfolioItemView;
}

export const AssetItem: React.FC<HoldingItemProps> = ({ portfolioItem }) => {
	const {
		asset,
		amount,
		value,
		profitTotal,
		currentPrice,
		profitPercentage,
	} = portfolioItem;

	const portfolioValueItemStyler = (num: number) => {
		return num < 0 ? COLORS.errorBase : theme.palette.secondary.main;
	};

	const NameSection = () => {
		return (
			<TableCell>
				<InlineDiv>
					<Avatar src={asset.logoUrl} />
					<Typography>{asset.name}</Typography>
				</InlineDiv>
			</TableCell>
		);
	};

	const AmountSection = () => {
		return (
			<TableCell align="right">
				<Typography>{ReformatCurrencyValue(amount, asset.symbol)}</Typography>
			</TableCell>
		);
	};

	const CurrentPriceSection = () => {
		return (
			<TableCell align="right">
				<Typography>${ReformatCurrencyValue(currentPrice, 'USD')}</Typography>
			</TableCell>
		);
	};
	const ValueSection = () => {
		return (
			<TableCell align="right">
				<Typography>${ReformatCurrencyValue(value.USD, 'USD')}</Typography>
			</TableCell>
		);
	};
	const ProfitSection = () => {
		return (
			<TableCell align="right">
				<Typography
					style={{ color: portfolioValueItemStyler(profitTotal.all) }}
				>
					${profitTotal.all.toFixed(2)}
				</Typography>
				<Typography
					style={{ color: portfolioValueItemStyler(profitPercentage.all) }}
				>
					{profitPercentage.all.toFixed(2)}%
				</Typography>
			</TableCell>
		);
	};

	return (
		<React.Fragment>
			{/* {value.USD > 0 && ( */}
			<TableRow>
				{NameSection()}
				{AmountSection()}
				{CurrentPriceSection()}
				{ValueSection()}
				{ProfitSection()}
			</TableRow>
			{/* )} */}
		</React.Fragment>
	);
};
