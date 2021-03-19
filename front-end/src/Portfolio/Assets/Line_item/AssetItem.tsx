import {
	Avatar,
	Grid,
	TableCell,
	TableRow,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	IPortfolioDataView,
	IPortfolioItemView,
	ITimeframe,
} from '../../../../../types';
import { FlexCard, FlexSpacer, InlineDiv } from '../../../_styles';
import { COLORS } from '../../../_styles/ResponsiveDesign';

import {
	ReformatAmountValue,
	ReformatCurrencyValue,
} from '../../../_helpers/formating';
import { theme } from '../../../_styles/Theme';
import { SimpleTimeSeries } from '../../../_components';
import {
	TimeframeSelectorDropdown,
	TimeframeSelectorToggle,
} from '../../../_components/Charts/TimeframeSelector/TimeframeSelector';

interface HoldingItemProps {
	portfolioItem: IPortfolioItemView;
}

export const AssetItem: React.FC<HoldingItemProps> = ({ portfolioItem }) => {
	var {
		asset,
		amount,
		value,
		profitTotal,
		currentPrice,
		profitPercentage,
	} = portfolioItem;

	const [timeframe, setTimeframe] = useState<ITimeframe>('24H');

	const TframeItem = (item: { all: number; h24: number }) => {
		if (timeframe == 'ALL') {
			return item.all;
		} else {
			return item.h24;
		}
	};

	const portfolioValueItemStyler = (num: number) => {
		return num < 0 ? COLORS.errorBase : theme.palette.secondary.main;
	};

	return (
		<FlexCard style={{ padding: '10px 5px', width: '250px' }}>
			<Grid container xs={12}>
				<Grid wrap="nowrap" container xs={12}>
					<Grid alignItems="center" container>
						<Avatar src={asset.logoUrl} />
						<Typography>{asset.name}</Typography>
					</Grid>

					<FlexSpacer />
					<Grid xs item>
						<TimeframeSelectorToggle
							Tframe={timeframe}
							setTimeframe={setTimeframe}
						/>
					</Grid>
				</Grid>
				<Grid container xs={12}>
					<div style={{ width: '100%', height: '70px' }}>
						<SimpleTimeSeries
							id={asset.name + 'chart'}
							data={[
								{ T: 1, USD: 524 },
								{ T: 2, USD: 25 },
								{ T: 3, USD: 127 },
								{ T: 4, USD: 23 },
								{ T: 5, USD: 146 },
								{ T: 6, USD: 894 },
							]}
							showTooltip={false}
							showX={false}
							showY={false}
						/>
					</div>
				</Grid>
				<Grid justify="center" container>
					<Typography>{ReformatCurrencyValue(value.USD, 'USD')}</Typography>
				</Grid>
				<Grid justify="center" container>
					<Typography
						style={{
							color: portfolioValueItemStyler(TframeItem(profitPercentage)),
						}}
					>
						{profitTotal.h24.toFixed(2)}
					</Typography>
				</Grid>
				<Grid justify="center" container>
					<Typography
						style={{
							color: portfolioValueItemStyler(TframeItem(profitPercentage)),
						}}
					>
						{TframeItem(profitPercentage).toFixed(2)}%
					</Typography>
				</Grid>
			</Grid>
		</FlexCard>
	);
};
