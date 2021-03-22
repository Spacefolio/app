import {
	Avatar,
	Backdrop,
	Button,
	CircularProgress,
	ClickAwayListener,
	Grid,
	ListItemIcon,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Typography,
} from '@material-ui/core';
import { AccountBalanceWallet, Add, ArrowDropDown } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { AddIntegrationPopup } from '../../Integrations';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { PortfolioPieChart } from '../../_components';
import { useFilteredPortfolio } from '../../_hooks/useFilteredPortfolio';
import { IRootState } from '../../_reducers';
import { FlexCard, FlexCardHeader, InlineDiv } from '../../_styles';
import { theme } from '../../_styles/Theme';
import { AssetAllocations } from '../Assets/AssetAllocations';
import { Assets } from '../Assets/Assets';
import { AssetsMiniList } from '../Assets/AssetsMiniList';
import { PortfolioSummaryItem } from './Line_item/PortfolioSummaryItem';
import { SummaryWrapper } from './Line_item/_styles';

export const PortfolioSummary = () => {
	const portfolioData = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const [filterId, setFilterId] = useState('ALL');

	const filteredPortfolio = useFilteredPortfolio(filterId);

	const anchorEl = useRef<any>(null);

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	const handleClose = (event: React.MouseEvent<EventTarget>) => {
		if (
			anchorEl.current &&
			anchorEl.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	const IntegrationDropdown = () => (
		<div>
			<Button
				ref={anchorEl}
				startIcon={
					filteredPortfolio.logoUrl ? (
						<Avatar src={filteredPortfolio.logoUrl} />
					) : (
						<Avatar>
							<AccountBalanceWallet />
						</Avatar>
					)
				}
				onClick={() => setOpen(!open)}
			>
				{filteredPortfolio.nickname}
				<ArrowDropDown />
			</Button>

			<Popper
				open={open}
				anchorEl={anchorEl.current}
				role={undefined}
				transition
			>
				<Paper>
					<ClickAwayListener onClickAway={handleClose}>
						<MenuList
							autoFocusItem={open}
							id="menu-list-grow"
							onClick={() => setOpen(false)}
						>
							{portfolioData.map((item) => (
								<MenuItem
									onClick={() => {
										setFilterId(item.id), setOpen(false);
									}}
								>
									<ListItemIcon>
										{item.logoUrl ? (
											<Avatar src={item.logoUrl} />
										) : (
											<Avatar>
												<AccountBalanceWallet />
											</Avatar>
										)}
									</ListItemIcon>
									<Typography>{item.nickname}</Typography>
								</MenuItem>
							))}
							<MenuItem
								onClick={() =>
									dispatch(
										applicationViewActions.setModal(
											true,
											<AddIntegrationPopup />,
											'Add Integration'
										)
									)
								}
							>
								<ListItemIcon>
									<Avatar>
										<Add />
									</Avatar>
								</ListItemIcon>
								<Typography>Add Portfolio</Typography>
							</MenuItem>
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Popper>
		</div>
	);

	return (
		<ThemeProvider theme={theme}>
			{filteredPortfolio ? (
				<SummaryWrapper>
					{IntegrationDropdown()}

					<PortfolioSummaryItem
						timeframe={'24H'}
						portfolioItem={filteredPortfolio}
					/>

					<AssetAllocations data={filteredPortfolio} />

					<Assets portfolioItems={filteredPortfolio.portfolioItems} />

					{/* <Transactions transactions={filteredPortfolio.transactions} />  */}
				</SummaryWrapper>
			) : (
				<Backdrop open>
					<CircularProgress color="inherit" />
				</Backdrop>
			)}
		</ThemeProvider>
	);
};
