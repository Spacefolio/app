import {
	Avatar,
	Backdrop,
	Button,
	Chip,
	CircularProgress,
	ClickAwayListener,
	Fab,
	ListItemIcon,
	Menu,
	MenuItem,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';
import { Add, ArrowDropDown } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { IPortfolioItem } from '../../../../back-end/src/portfolios/portfolio.model';
import { IPortfolioDataView, ITimeframe } from '../../../../types';
import {
	ActionButton,
	FlexCard,
	FlexCardContent,
	FlexCardHeader,
	FlexSpacer,
	InlineDiv,
} from '../../_styles';
import { theme } from '../../_styles/Theme';
import { IRootState } from '../../_reducers';
import { PortfolioSummaryItem } from './Line_item/PortfolioSummaryItem';
import { SummaryWrapper } from './Line_item/_styles';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';
import { Assets } from '../Assets/Assets';
import { Transactions } from '..';
import { Dropdown } from '../../_components';
import { ListMyExchanges } from '../../Integrations';

export const PortfolioSummary = () => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const [filterId, setFilterId] = useState('ALL');

	const filteredPortfolio = useFilteredPortfolio(filterId);

	const anchorEl = useRef<any>(null);

	const [open, setOpen] = useState(false);

	return (
		<ThemeProvider theme={theme}>
			{filteredPortfolio ? (
				<SummaryWrapper>
					<div>
						<Button
							ref={anchorEl}
							startIcon={<Avatar src={filteredPortfolio.logoUrl} />}
							onClick={() => setOpen(!open)}
						>
							{filteredPortfolio.nickname}
							<ArrowDropDown />
						</Button>

						<Menu
							onClose={() => setOpen(false)}
							anchorEl={anchorEl.current}
							id={'integration-pop'}
							open={open}
						>
							{portfolioData.map((item) => (
								<MenuItem
									onClick={() => {
										setFilterId(item.id), setOpen(false);
									}}
								>
									<ListItemIcon>
										<Avatar src={item.logoUrl} />
									</ListItemIcon>
									<Typography>{item.nickname}</Typography>
								</MenuItem>
							))}
						</Menu>
					</div>

					{CardHeader('Overview', 'Your portfolio at a glance')}
					<PortfolioSummaryItem
						timeframe={'24H'}
						portfolioItem={filteredPortfolio}
					/>

					{CardHeader('Holdings', 'Your assets and their performance')}
					<Assets portfolioItems={filteredPortfolio.portfolioItems} />

					{CardHeader('Strategies', 'All strategies running on this portfolio')}
					<Assets portfolioItems={filteredPortfolio.portfolioItems} />

					{/* {CardHeader('Transactions', 'Your completed transactions')}
					<Transactions transactions={filteredPortfolio.transactions} /> */}
				</SummaryWrapper>
			) : (
				<Backdrop open>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
		</ThemeProvider>
	);
};

function CardHeader(title: string, caption: string) {
	return (
		<FlexCardHeader>
			<InlineDiv style={{ padding: '12px' }}>
				<div>
					<InlineDiv>
						<Typography variant="h2">{title}</Typography>
					</InlineDiv>
					<InlineDiv spacing={1}>
						<Typography variant="caption">{caption}</Typography>
					</InlineDiv>
				</div>
			</InlineDiv>
		</FlexCardHeader>
	);
}
