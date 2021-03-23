import {
	Avatar,
	Grid,
	Hidden,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
	IPortfolioItemView,
	IPortfolioLineChartItem,
	ITimeframe,
} from '../../../../../types';
import { FlexCard, FlexSpacer, InlineDiv } from '../../../_styles';
import { COLORS, SPACING } from '../../../_styles/ResponsiveDesign';
import { theme } from '../../../_styles/Theme';
import { SimpleTimeSeries } from '../../../_components';
import { TimeframeSelectorToggle } from '../../../_components/Charts/TimeframeSelector/TimeframeSelector';
import { ReformatCurrencyValueMini } from '../../../_helpers';

interface HoldingItemProps {
	portfolioItem: IPortfolioItemView;
}

export const AssetCard: React.FC<HoldingItemProps> = ({ portfolioItem }) => {
	var {
		sparkline,
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

	const fakeChart = () => {
		var dataArray: IPortfolioLineChartItem[] = [];

		if (sparkline.length > 0) {
			for (let i = 0; i < 50; i++) {
				dataArray.push({ T: i, USD: sparkline[i] });
			}
		} else {
			for (let i = 0; i < 50; i++) {
				var USD: number = 0;
				if (i > 0) {
					USD = dataArray[i - 1].USD + Math.random() * 10 - 5;
				} else {
					USD = Math.random() * 50;
				}
				dataArray.push({ T: i, USD });
			}
		}

		return dataArray;
	};

	const [fakeChartData, setFakeChartData] = useState(fakeChart());

	useEffect(() => {
		setFakeChartData(fakeChart());
	}, []);

	const mobile = useMediaQuery(theme.breakpoints.up('sm'));

	return (
		<FlexCard
			style={{
				borderRadius: '10px',
				position: 'relative',
				padding: theme.spacing(2),
				width: mobile ? '250px' : '150px',
			}}
		>
			<Grid container item xs={12} alignItems="center">
				<Grid xs={12} container justify="center" alignItems="center">
					<Grid item>
						<Avatar src={asset.logoUrl} />
					</Grid>
				</Grid>

				<Grid xs={12} container justify="center" alignItems="center">
					<Grid item>
						<Typography noWrap gutterBottom>
							{asset.name} ({asset.symbol})
						</Typography>
					</Grid>
				</Grid>

				<Hidden xsDown>
					<Grid xs={12} container justify="center" alignItems="center">
						<Grid item>
							<Typography gutterBottom style={{ fontSize: '1.35rem' }}>
								${currentPrice.toLocaleString()}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="body2">/unit</Typography>
						</Grid>
					</Grid>
					<Grid item style={{ height: '10px' }} />
					<Grid xs={12} container>
						<Grid xs item>
							<div style={{ height: '70px' }}>
								<SimpleTimeSeries
									id={asset.name + 'chart'}
									data={fakeChartData}
									showTooltip={true}
									showX={false}
									showY={false}
								/>
							</div>
						</Grid>
					</Grid>
					<Grid item style={{ height: '10px' }} />
				</Hidden>

				<Grid xs={12} justify="center" alignItems="center" container>
					<Grid item>
						<Typography
							style={{ fontSize: 10 }}
							variant="button"
							gutterBottom
							color="textSecondary"
						>
							Profit/Loss
						</Typography>
					</Grid>
					<Grid item>
						<TimeframeSelectorToggle
							Tframe={timeframe}
							setTimeframe={setTimeframe}
						/>
					</Grid>
				</Grid>

				<Grid item style={{ height: '10px' }} />

				<Grid xs={12} justify="center" container>
					<Grid item>
						<Typography
							variant="h4"
							gutterBottom
							style={{
								color: portfolioValueItemStyler(TframeItem(profitPercentage)),
								fontSize: '1.6rem',
								fontWeight: 500,
							}}
						>
							{TframeItem(profitPercentage) > 0 ? '+' : ''}
							{TframeItem(profitPercentage).toFixed(2)}%
						</Typography>
					</Grid>
				</Grid>

				<Grid xs={12} justify="center" container>
					<Grid item>
						<Typography variant="body2">
							{ReformatCurrencyValueMini(TframeItem(profitTotal))} USD
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</FlexCard>
	);
};
