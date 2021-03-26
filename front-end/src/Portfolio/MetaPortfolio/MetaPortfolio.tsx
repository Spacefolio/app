import { Button, Typography } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { IPortfolioDataView, ITimeframe } from '../../../../types';
import { ListMyExchanges } from '../../Integrations';
import { alertActions } from '../../_actions';
import { Dropdown, PortfolioLineChart } from '../../_components';
import { TimeframeSelectorBar } from '../../_components/Charts/TimeframeSelector/TimeframeSelector';
import useDimensions from '../../_hooks/useDimensions';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';
import { portfolioService } from '../../_services';
import { InlineDiv } from '../../_styles';
import {
  MetaPortfolioWrapper,

  PortfolioName,

  PortfolioProfitSection, PortfolioValueColumn, PortfolioValueWrapper
} from './_styles';

export const MetaPortfolio = () => {
	const dispatch = useDispatch();

	const filteredPortfolioData: IPortfolioDataView = useFilteredPortfolio('ALL');

	const [chartContainerRef, { width: chartContainerWidth }] = useDimensions();

	const [PortfolioChartData, setPortfolioChartData] = useState<[]>([]);

	const [timeframe, setTimeframe] = useState<ITimeframe>('ALL');

	useEffect(() => {
		setPortfolioChartData([]);
		portfolioService
			.getPortfolioChartData(timeframe, 'All')
			.then((res) => {
				setPortfolioChartData(res);
			})
			.catch((error) => {
				dispatch(alertActions.error(error.message));
			});
	}, [timeframe]);

	const [chartDate, setChartDate] = useState(false);

	const [chartValue, setChartValue] = useState(false);

	const PortfolioValueSection = () => {
		const [portfolioSelectorVisible, setPortfolioSelectorVisible] = useState(
			false
		);

		const ref: MutableRefObject<undefined> = useRef();

		const CurrentPortfolio = () => (
			<PortfolioName
				ref={ref}
				onClick={() => setPortfolioSelectorVisible(!portfolioSelectorVisible)}
			>
				<Button size="large" variant="outlined" color="primary">
					<InlineDiv>
						All Portfolios
						<ArrowDropDown />
					</InlineDiv>
				</Button>

				<Dropdown
					containerRef={ref}
					isVisible={portfolioSelectorVisible}
					setVisiblity={() => setPortfolioSelectorVisible(false)}
				>
					<ListMyExchanges enableEditing={false} />
				</Dropdown>
			</PortfolioName>
		);

		const PortfolioValue = () => (
			<React.Fragment>
				{filteredPortfolioData.portfolioTotal != null ? (
					<InlineDiv>
						<Typography variant="h5">$</Typography>
						<div id={'PVID'}>
							{chartValue
								? null
								: filteredPortfolioData.portfolioTotal.USD.toFixed(2)}
						</div>
					</InlineDiv>
				) : (
					'loading...'
				)}
			</React.Fragment>
		);

		const PortfolioDate = () => (
			<React.Fragment>
				{filteredPortfolioData != null ? (
					<div id={'PDID'}>{chartDate ? '' : ''}</div>
				) : (
					'loading...'
				)}
			</React.Fragment>
		);

		const ProfitPercentage = () => (
			<React.Fragment>
				{filteredPortfolioData.profitPercentage != null
					? `(${filteredPortfolioData.profitPercentage.toFixed(2)}%)`
					: 'loading...'}
			</React.Fragment>
		);

		const ProfitTotal = () => (
			<React.Fragment>
				{filteredPortfolioData.profitTotal != null
					? `$${filteredPortfolioData.profitTotal.USD.toFixed(2)}`
					: 'loading...'}
			</React.Fragment>
		);

		const ProfitDirection = () => (
			<React.Fragment>
				{filteredPortfolioData.profitTotal != null ? (
					filteredPortfolioData.profitTotal.USD > 0 ? (
						<ArrowDropUp />
					) : (
						<ArrowDropDown />
					)
				) : (
					'loading...'
				)}
			</React.Fragment>
		);

		return (
			<React.Fragment>
				{filteredPortfolioData != null ? (
					<PortfolioValueWrapper>
						{/* <PortfolioValueColumn style={{ alignItems: "start" }}>
          {CurrentPortfolio}
          {SyncButtonSection}
        </PortfolioValueColumn> */}
						<PortfolioValueColumn>
							<InlineDiv>
								<Typography variant={'h4'}>
									{PortfolioValue()}
									{PortfolioDate()}
									{/* {RefreshButton} */}
								</Typography>
							</InlineDiv>
						</PortfolioValueColumn>
						<PortfolioValueColumn>
							<PortfolioProfitSection
								value={
									filteredPortfolioData && filteredPortfolioData.profitTotal.USD
								}
							>
								{ProfitDirection()} {ProfitTotal()} {ProfitPercentage()}
							</PortfolioProfitSection>
						</PortfolioValueColumn>
					</PortfolioValueWrapper>
				) : (
					'loading...'
				)}
			</React.Fragment>
		);
	};

	return (
		<MetaPortfolioWrapper>
			{PortfolioValueSection()}
			<div
				ref={chartContainerRef}
				style={{
					width: '100%',
					overflow: 'hidden',
				}}
			>
				<TimeframeSelectorBar Tframe={timeframe} setTimeframe={setTimeframe}/>
				<PortfolioLineChart
					setPV={setChartValue}
					setDate={setChartDate}
					data={PortfolioChartData}
					width={chartContainerWidth}
					xAxis={true}
					timeframe={timeframe}
					yAxis={false}
					height={400}
					id={'PCardChart'}
				/>
			</div>
		</MetaPortfolioWrapper>
	);
};
