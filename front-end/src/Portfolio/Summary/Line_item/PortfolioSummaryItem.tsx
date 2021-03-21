import {
	Avatar,
	Typography,
	Grid,
	Hidden,
	useMediaQuery,
	Card,
	CircularProgress,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView, ITimeframe } from '../../../../../types';
import { alertActions, portfolioActions } from '../../../_actions';
import {
	SimpleTimeSeries,
	PortfolioPieChart,
	PortfolioLineChart,
} from '../../../_components';
import { portfolioService } from '../../../_services';
import {
	FlexCard,
	InlineDiv,
	FlexCardContent,
	FlexCardHeader,
	FlexSpacer,
} from '../../../_styles';
import useDimensions from 'react-use-dimensions';
import { AssetsMiniList } from '../../Assets/AssetsMiniList';
import { SyncIcon } from '../../../_styles/IconStyles';
import {
	TimeframeSelectorBar,
	TimeframeSelectorDropdown,
} from '../../../_components/Charts/TimeframeSelector/TimeframeSelector';
import { ProfitColorizer, ReformatCurrencyValueMini } from '../../../_helpers';
import { theme } from '../../../_styles/Theme';
import {
	ArrowDownward,
	ArrowDropDown,
	ArrowDropUp,
	ArrowUpward,
} from '@material-ui/icons';
import {
	OverviewValue,
	OverviewLabel,
	OverviewPercent,
	OverviewContainer,
} from './_styles';
import styled from 'styled-components';
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

	const testColors = [
		'rgb(211, 241, 210)',
		'rgb(144, 204, 222)',
		'rgb(160, 155, 204)',
		'rgb(203, 166, 204)',
		'rgb(243, 198, 209)',
		'rgb(253, 218, 223)',
	];

	const Balance = () => (
		<Grid
			style={{ gap: theme.spacing(2), marginBottom: theme.spacing(2) }}
			xs={12}
			container
		>
			<Grid alignItems="center" justify="center" container xs={12} sm>
				<OverviewContainer fullWidth>
					<Grid xs={12} justify='center' alignItems='center' item container>
						<OverviewValue id="PVID">
							{chartBalance
								? ''
								: ReformatCurrencyValueMini(portfolioItem.portfolioTotal.USD)}
						</OverviewValue>
						<div id="PDID"> {chartDate ? '' : ''}</div>
					</Grid>
					<Grid xs={12} item>
						<OverviewLabel align="center">Total Balance</OverviewLabel>
					</Grid>
				</OverviewContainer>
			</Grid>

			<Grid alignItems="center" justify="center" container xs={12} sm>
				<OverviewContainer flexDirection="row" fullWidth>
					<Grid xs={1} container justify="center" alignItems="center">
						{ProfitArrow(portfolioItem.portfolioTotal.USD)}
					</Grid>
					<Grid xs={11}>
						<Grid>
							<OverviewValue align="center">
								{ReformatCurrencyValueMini(portfolioItem.profitTotal.USD)}
							</OverviewValue>
						</Grid>
						<Grid alignItems="center" justify="center" xs={12} container item>
							<OverviewLabel align="center">Total Profit/Loss </OverviewLabel>
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
							<OverviewValue align="center">
								{ReformatCurrencyValueMini(periodValueChange)}
							</OverviewValue>
						</Grid>
						<Grid alignItems="center" justify="center" xs={12} container item>
							<OverviewLabel align="center">{Tframe + ' Change'}</OverviewLabel>
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
			<div style={{ padding: `${theme.spacing(1)} 0` }}>
				<Grid xs={12} container>
					<Grid
						alignItems="center"
						justify="space-evenly"
						xs={12}
						sm={8}
						container
					>
						<Grid item xs={12} ref={chartContainerRef}>
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

					<Grid
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
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{portfolioItem ? (
				<React.Fragment>
					{Balance()}
					<FlexCard {...props} fullWidth disableGutters={!mobile}>
						{Content()}
					</FlexCard>
				</React.Fragment>
			) : (
				<CircularProgress />
			)}
		</React.Fragment>
	);
};

const ProfitArrow = (profit: number) => (
	<React.Fragment>
		{profit > 0 ? <ArrowUpward /> : <ArrowDownward />}
	</React.Fragment>
);
