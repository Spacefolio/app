import {
	Avatar,
	Typography,
	Grid,
	Hidden,
	Button,
	MenuItem,
	ClickAwayListener,
	Popper,
	MenuList,
	Paper,
	ListItemIcon,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IPortfolioDataView, timeframe } from '../../../../../types';
import { alertActions, portfolioActions } from '../../../_actions';
import { SimpleTimeSeries, PortfolioPieChart } from '../../../_components';
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
import { timeFrameSelectors } from '../../../_helpers';
import { DateRange } from '@material-ui/icons';

export interface IPortfolioSummaryItemView {
	portfolioItem: IPortfolioDataView;
}

export const PortfolioSummaryItem: React.FC<IPortfolioSummaryItemView> = ({
	portfolioItem,
	...props
}) => {
	const dispatch = useDispatch();

	const [chartData, setChartData] = useState([]);

	const [chartContainerRef, { width }] = useDimensions();

	const [Tframe, setTimeframe] = useState<timeframe>('ALL');

	useEffect(() => {
		setChartData([]);
		portfolioItem &&
			portfolioService
				.getPortfolioChartData(Tframe, portfolioItem.id)
				.then((res) => {
					setChartData(res);
				})
				.catch((error: Error) => {
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

	const anchorRef = React.useRef<HTMLButtonElement>(null);
	const [TframeVisible, setTframeVisible] = useState(false);

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setTframeVisible(false);
	};

	const TimeframeSelector = () => (
		<div>
			<Button
				ref={anchorRef}
				aria-controls={open ? 'menu-list-grow' : undefined}
				aria-haspopup="true"
				onClick={() => setTframeVisible(!TframeVisible)}
			>
				{Tframe}
				<DateRange />
			</Button>
			<Popper
				open={TframeVisible}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
			>
				<Paper>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList
							autoFocusItem={TframeVisible}
							id="menu-list-grow"
							onClick={() => setTframeVisible(false)}
						>
							{timeFrameSelectors.map((item: timeframe, index: number) => {
								return (
									<MenuItem
										key={index}
										onClick={() => {
											setTimeframe(item);
										}}
										selected={item == Tframe}
									>
										{item}
									</MenuItem>
								);
							})}
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</div>
	);

	const Content = () => (
		<React.Fragment>
			<FlexCardHeader>
				<InlineDiv style={{ padding: '12px' }}>
					<div>
						<InlineDiv>
							<Typography variant="h2">{portfolioItem.nickname}</Typography>
						</InlineDiv>
						<InlineDiv spacing={1}>
							<Avatar
								style={{ width: '15px', height: '15px' }}
								src={portfolioItem.logoUrl}
							/>
							<Typography variant="caption">{portfolioItem.name}</Typography>
						</InlineDiv>
					</div>
					{TimeframeSelector()}
					<FlexSpacer />
				</InlineDiv>
			</FlexCardHeader>
			<FlexCardContent>
				<Grid xs={12} container>
					<Grid justify="center" alignItems="center" xs={12} container>
						<Typography
							style={{
								fontWeight: 700,
								fontSize: '2.125rem',
								lineHeight: '2.5rem',
							}}
						>
							{portfolioItem.portfolioTotal.USD.toFixed(2)} USD
						</Typography>
						<SyncIcon
							onClick={() =>
								dispatch(portfolioActions.refresh(portfolioItem.id, true))
							}
						/>
					</Grid>
					<Grid
						ref={chartContainerRef}
						alignItems="center"
						justify="center"
						xs={12}
						sm={4}
						container
					>
						<Grid ref={chartContainerRef} xs>
							<SimpleTimeSeries
								showX={false}
								showY={false}
								id={portfolioItem.nickname.replace(/\s/g, '') + 'chart'}
								data={chartData}
							/>
						</Grid>
					</Grid>
					<Hidden xsDown>
						<Grid container alignItems="center" justify="center" sm={4}>
							<PortfolioPieChart
								colors={testColors}
								data={portfolioItem.portfolioItems}
								size={150}
								id={portfolioItem.nickname.replace(/\s/g, '') + 'pie'}
							/>
						</Grid>
					</Hidden>
					<Grid alignItems="center" justify="center" xs={12} sm={4} container>
						<AssetsMiniList
							colors={testColors}
							portfolioItems={portfolioItem.portfolioItems}
						/>
					</Grid>
				</Grid>
			</FlexCardContent>
		</React.Fragment>
	);

	return (
		<FlexCard {...props} fullWidth>
			{portfolioItem && Content()}
		</FlexCard>
	);
};
