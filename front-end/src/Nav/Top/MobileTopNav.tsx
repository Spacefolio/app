import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { userActions } from '../../_actions';
import { ArrowIcon, Dropdown, IDropdownItem } from '../../_components';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { IRootState } from '../../_reducers';
import {
	BrandingContainer,
	BrandTextLink,
	NavAccountContainer,
	NavAccountText,
	NavContainer,
	NavFlexSpacer,
	NavLogoArea,
	ToggleSidebar,
} from './_styles';
import {
	SpacefolioLogo,
	BaseLink,
	ClickableDiv,
	InlineDiv,
	SvgWrapperButton,
} from '../../_styles';
import {
	Avatar,
	ListItemAvatar,
	ListItemIcon,
	MenuItem,
	MenuList,
	Slide,
	Typography,
	useScrollTrigger,
} from '@material-ui/core';
import { COLORS, RD } from '../../_styles/ResponsiveDesign';
import { ArrowDropDown, ExitToApp, Menu } from '@material-ui/icons';
import { ListMyExchanges } from '../../Integrations';
import { IPortfolioDataView } from '../../../../types';
import useMedia from 'use-media';
import { theme } from '../../_styles/Theme';

interface Props {
	window?: () => Window;
	children: React.ReactElement;
}

function HideOnScroll(props: Props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export const MobileTopNav = () => {
	const dispatch = useDispatch();

	const user = useSelector((state: IRootState) => state.authentication.user);

	const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);

	const [exchangesPopupVisible, setExchangesPopupVisible] = useState(false);

	const isSidebarCollapsed = useSelector(
		(state: IRootState) => state.applicationView.isSidebarCollapsed
	);

	const isMobile = useMedia({ maxWidth: RD.breakpointsmartphone });

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
		<HideOnScroll>
			<NavContainer>
				<ToggleSidebar
					onClick={() => dispatch(applicationViewActions.toggleSidebar())}
				>
					<Menu />
				</ToggleSidebar>
				<NavLogoArea>
					<BrandTextLink to="/dashboard">
						<SvgWrapperButton>
							<SpacefolioLogo />
						</SvgWrapperButton>
					</BrandTextLink>
				</NavLogoArea>
				<NavAccountContainer
					ref={container}
					onClick={() => {
						setAccountDropdownVisible(!accountDropdownVisible);
					}}
					style={{
						position: 'absolute',
						right: '1rem',
					}}
				>
					<InlineDiv>
						<Avatar
							style={{
								color: 'white',
								backgroundColor: theme.palette.primary.main,
							}}
						>
							{user.firstName
								? user.firstName
								: user.email[0].toUpperCase() + user.email[1].toUpperCase()}
						</Avatar>
					</InlineDiv>
					{accountDropdownVisible && accountDropdown}
				</NavAccountContainer>
			</NavContainer>
		</HideOnScroll>
	);
};
