import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { portfolioActions, userActions } from '../../_actions';
import {
	ArrowIcon,
	Dropdown,
	IDropdownItem,
	Modal,
} from '../../_components';
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
import { Add, ArrowDropDown, ExitToApp } from '@material-ui/icons';
import { AddIntegrationPopup, ListMyExchanges } from '../../Integrations';
import { IPortfolioDataView } from '../../../../types';
import { SyncIcon } from '../../_styles/IconStyles';
import { NavAccountContainer, NavContainer, NavFlexSpacer, ToggleSidebar } from './_styles';


export const DesktopTopNav = () => {
	const dispatch = useDispatch();

	const user = useSelector((state: IRootState) => state.authentication.user);

	const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

	const filteredPortfolioData: IPortfolioDataView = useSelector(
		(state: IRootState) => state.portfolio.filteredPortfolioData
	);

	const portfolioData: IPortfolioDataView[] = useSelector(
		(state: IRootState) => state.portfolio.PortfolioData
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

	const [
		metaPortfolioData,
		setMetaPortfolioData,
	] = useState<IPortfolioDataView>();

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
				<ListMyExchanges enableEditing={false} />
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
				<ArrowIcon direction={!isSidebarCollapsed ? 'left' : 'right'} />
			</ToggleSidebar>
			<NavFlexSpacer />
			<div
				style={{ border: '1px solid black', width: '100px', height: '100%' }}
			>
				{metaPortfolioData
					? 'Total Value: ' + metaPortfolioData.portfolioTotal
					: 'Total Holdings: $15,684'}
			</div>
			<NavFlexSpacer />
			<InlineDiv>
				{DEV_SERVER == 'DEVELOPMENT' && (
					<div>
						sync
						<SyncIcon
							onClick={() => dispatch(portfolioActions.sync())}
							isSyncing={isSyncing}
						/>
						refresh
						<SyncIcon
							onClick={() =>
								dispatch(portfolioActions.refresh(filteredPortfolioData.id))
							}
							isSyncing={isRefreshing}
						/>
					</div>
				)}
				<NavFlexSpacer />
			</InlineDiv>
			<NavAccountContainer
				ref={container}
				onClick={() => {
					setAccountDropdownVisible(!accountDropdownVisible);
				}}
			>
				<InlineDiv>
					{/* <Avatar src={filteredPortfolioData.logoUrl} /> */}
					Hi, {user.firstName}
					<ArrowDropDown />
				</InlineDiv>
				{accountDropdown}
			</NavAccountContainer>
		</NavContainer>
	);
};
