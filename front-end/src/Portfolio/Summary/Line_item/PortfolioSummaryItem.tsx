import {
	CircularProgress,
	Grid,
	Typography,
	useMediaQuery,
} from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView, ITimeframe } from '../../../../../types';
import { alertActions } from '../../../_actions';
import { PortfolioLineChart } from '../../../_components';
import { TimeframeSelectorBar } from '../../../_components/Charts/TimeframeSelector/TimeframeSelector';
import { ReformatCurrencyValueMini } from '../../../_helpers';
import useDimensions from '../../../_hooks/useDimensions';
import { portfolioService } from '../../../_services';
import { FlexCard, FlexCardHeader } from '../../../_styles';
import { theme } from '../../../_styles/Theme';
import { OverviewContainer, OverviewPercent } from './_styles';
export interface IPortfolioSummaryItemView {
	timeframe?: ITimeframe;
	portfolioItem: IPortfolioDataView;
}

export const PortfolioSummaryItem: React.FC<IPortfolioSummaryItemView> = ({
	timeframe,
	portfolioItem,
	...props
}) => {
	const mobile = useMediaQuery(theme.breakpoints.up('md'));

	const dispatch = useDispatch();

	const [chartData, setChartData] = useState(null);

	const [chartContainerRef, { width }] = useDimensions();

	const [Tframe, setTimeframe] = useState<ITimeframe>(timeframe || 'ALL');

	const [periodValueChange, setPeriodValueChange] = useState(0);

	const [periodPercentChange, setPeriodPercentChange] = useState(0);

	const [chartBalance, setChartBalance] = useState(false);

	const [chartDate, setChartDate] = useState(false);

	useEffect(() => {
		console.log(chartDate);
	}, [chartDate]);

	const calculateChartChange = (data: any) => {
		const first = data[0].USD;
		const last = data[data.length - 1].USD;

		const diff = last - first;

		setPeriodValueChange(diff);

		setPeriodPercentChange((diff / first) * 100);
	};

	useEffect(() => {
		setChartData(null);
		portfolioItem &&
			portfolioService
				.getPortfolioChartData(Tframe, portfolioItem.id)
				.then((res) => {
					calculateChartChange(res);
					setChartData(res);
				})
				.catch((error: Error) => {
					setChartData([]);
					dispatch(alertActions.error(error.message));
				});
	}, [portfolioItem, Tframe]);

	const Balance = () => (
		<Grid
			style={{ gap: theme.spacing(2), marginTop: theme.spacing(2) }}
			xs={12}
			container
		>
			<Grid alignItems="center" justify="center" container xs={12} sm>
				<OverviewContainer flexDirection="row" fullWidth>
					<Grid xs={1} container justify="center" alignItems="center">
						{ProfitArrow(portfolioItem.portfolioTotal.USD)}
					</Grid>
					<Grid xs={11}>
						<Grid>
							<Typography variant="h2" align="center">
								{ReformatCurrencyValueMini(portfolioItem.profitTotal.USD)}
							</Typography>
						</Grid>
						<Grid alignItems="center" justify="center" xs={12} container item>
							<Typography variant="subtitle2" align="center">
								Total Profit/Loss{' '}
							</Typography>
							<OverviewPercent
								align="center"
								value={portfolioItem.profitPercentage}
							>
								({portfolioItem.profitPercentage.toFixed(2)})%
							</OverviewPercent>
						</Grid>
					</Grid>
				</OverviewContainer>
			</Grid>

			<Grid alignItems="center" justify="center" container xs={12} sm>
				<OverviewContainer flexDirection="row" fullWidth>
					<Grid xs={1} container justify="center" alignItems="center">
						{ProfitArrow(periodValueChange)}
					</Grid>
					<Grid xs={11}>
						<Grid>
							<Typography variant="h2" align="center">
								{ReformatCurrencyValueMini(periodValueChange)}
							</Typography>
						</Grid>
						<Grid alignItems="center" justify="center" xs={12} container item>
							<Typography variant="subtitle2" align="center">
								{Tframe + ' Change'}
							</Typography>
							<OverviewPercent align="center" value={periodPercentChange}>
								(
								{periodPercentChange.toLocaleString(undefined, {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2,
								})}
								)%
							</OverviewPercent>
						</Grid>
					</Grid>
				</OverviewContainer>
			</Grid>
		</Grid>
	);

	const Content = () => (
		<React.Fragment>
			<Grid alignItems="center" justify="space-evenly" xs={12} container>
				<Grid
					item
					xs={12}
					style={{ overflowX: 'hidden' }}
					ref={chartContainerRef}
				>
					<FlexCardHeader>
						<Grid xs={12} alignItems="center" item container>
							<Typography variant="h1" id="PVID">
								{chartBalance
									? ''
									: ReformatCurrencyValueMini(portfolioItem.portfolioTotal.USD)}
							</Typography>
							<div id="PDID">{chartDate ? '' : chartDate}</div>
						</Grid>
						<Grid xs={12} item>
							<Typography variant="subtitle2">Total Balance</Typography>
						</Grid>
					</FlexCardHeader>

					<PortfolioLineChart
						xAxis={true}
						timeframe={Tframe}
						yAxis={false}
						setPV={setChartBalance}
						setDate={setChartDate}
						height={200}
						width={width}
						id={portfolioItem.nickname.replace(/\s/g, '') + 'chart'}
						data={chartData}
					/>
				</Grid>
				<TimeframeSelectorBar Tframe={Tframe} setTimeframe={setTimeframe} />
			</Grid>
		</React.Fragment>
	);

	return (
		<div style={{ gridArea: 'summary' }}>
			{portfolioItem ? (
				<React.Fragment>
					<FlexCard {...props} fullWidth disableGutters={!mobile}>
						{Content()}
					</FlexCard>{' '}
					{Balance()}
				</React.Fragment>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

const ProfitArrow = (profit: number) => (
	<React.Fragment>
		{profit > 0 ? <ArrowUpward /> : <ArrowDownward />}
	</React.Fragment>
);

{
	/* <Grid
container
wrap="nowrap"
alignItems="center"
justify="space-evenly"
xs={12}
sm={4}
>
<Grid>
  <PortfolioPieChart
    colors={testColors}
    data={portfolioItem.portfolioItems}
    size={150}
    id={portfolioItem.nickname.replace(/\s/g, '') + 'pie'}
  />
</Grid>
<Grid>
  <AssetsMiniList
    colors={testColors}
    portfolioItems={portfolioItem.portfolioItems}
  />
</Grid>
</Grid> */
}
