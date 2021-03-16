import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { portfolioActions, userActions } from '../../_actions';
import { ArrowIcon, Dropdown, IDropdownItem, Modal } from '../../_components';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { IRootState } from '../../_reducers';

import { InlineDiv } from '../../_styles';
import {
	Avatar,
	ListItemAvatar,
	MenuItem,
	MenuList,
	Portal,
	Tab,
	Tabs,
	Typography,
} from '@material-ui/core';
import { COLORS, RD } from '../../_styles/ResponsiveDesign';
import { Add, ArrowDropDown, ExitToApp, Menu } from '@material-ui/icons';
import { AddIntegrationPopup, ListMyExchanges } from '../../Integrations';
import { IPortfolioDataView } from '../../../../types';
import { SyncIcon } from '../../_styles/IconStyles';
import {
	NavAccountContainer,
	NavContainer,
	NavFlexSpacer,
	ToggleSidebar,
} from './_styles';

export const TopNav = () => {
	const dispatch = useDispatch();

	const user = useSelector((state: IRootState) => state.authentication.user);

	const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

	// const filteredPortfolioData: IPortfolioDataView = useSelector(
	// 	(state: IRootState) => state.portfolio.filteredPortfolioData
	// );

	const portfolioData: IPortfolioDataView[] = useSelector(
		(state: IRootState) => state.portfolio.portfoliosData
	);

	const isSyncing = useSelector(
		(state: any) => state.portfolio.syncingPortfolio
	);

	const isRefreshing = useSelector(
		(state: any) => state.portfolio.recalculatingPortfolio
	);

	const isSidebarCollapsed = useSelector(
		(state: IRootState) => state.applicationView.isSidebarCollapsed
	);

	const [metaPortfolioData, setMetaPortfolioData] = useState<
		IPortfolioDataView
	>();

	useEffect(() => {
		setMetaPortfolioData(
			portfolioData.filter((item: IPortfolioDataView) => item.id == 'ALL')[0]
		);
	}, [portfolioData]);

	const history = useHistory();

	const { logout } = userActions;

	const container = useRef();

	const accountDropdown = (
		<Dropdown
			isVisible={accountDropdownVisible}
			setVisiblity={setAccountDropdownVisible}
			containerRef={container}
		>
			<MenuList>
				<MenuItem
					button={true}
					key={'AddExchange'}
					onClick={() =>
						dispatch(
							applicationViewActions.setModal(
								true,
								<AddIntegrationPopup />,
								'Add Exchange'
							)
						)
					}
				>
					<ListItemAvatar>
						<Add />
					</ListItemAvatar>
					<Typography>Add Exchange</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(logout());
						location.reload();
					}}
					button={true}
				>
					<ListItemAvatar>
						<Avatar
							style={{
								color: COLORS.darkBase,
								backgroundColor: 'white',
								border: `${COLORS.darkBase} solid 2px`,
							}}
						>
							<ExitToApp />
						</Avatar>
					</ListItemAvatar>
					<Typography>Logout</Typography>
				</MenuItem>
			</MenuList>
		</Dropdown>
	);

	return (
		<NavContainer>
			<ToggleSidebar
				onClick={() => dispatch(applicationViewActions.toggleSidebar())}
			>
				<Menu />
			</ToggleSidebar>
			<NavFlexSpacer />
			<InlineDiv>
				{DEV_SERVER == 'DEVELOPMENT' && (
					<SyncIcon
						onClick={() => dispatch(portfolioActions.sync())}
						isSyncing={isSyncing}
					/>
				)}
			</InlineDiv>
			<NavFlexSpacer />
			<NavAccountContainer
				ref={container}
				onClick={() => {
					setAccountDropdownVisible(!accountDropdownVisible);
				}}
			>
				<InlineDiv>
					<Avatar color="primary">
						{user.firstName
							? user.email[0].toUpperCase() + user.email[1].toUpperCase()
							: user.firstName[0].toUpperCase() +
							  user.firstName[1].toUpperCase()}
					</Avatar>
					<ArrowDropDown />
				</InlineDiv>
				{accountDropdown}
			</NavAccountContainer>
		</NavContainer>
	);
};
