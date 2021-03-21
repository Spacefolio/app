import React, { useEffect, useState } from 'react';
import {
	MobileSidebarContainer,
	SidebarContainer,
	SidebarSpacer,
} from './_styles';
import { useDispatch, useSelector } from 'react-redux';
import { SidebarActionItem } from './Line_item/SidebarActionItem';
import {
	Android,
	Dashboard,
	Help,
	PieChart,
	Settings,
	TrendingUp,
} from '@material-ui/icons';
import {
	Drawer,
	Hidden,
	Modal,
	Slide,
	Tabs,
	useMediaQuery,
} from '@material-ui/core';
import { IRootState } from '../../_reducers';
import { theme } from '../../_styles/Theme';
import { applicationViewActions } from '../../_actions/applicationView.actions';

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = () => {
	const dispatch = useDispatch();

	const isSidebarCollapsed = useSelector(
		(state: IRootState) => state.applicationView.isSidebarCollapsed
	);

	const mobile = useMediaQuery(theme.breakpoints.down('sm'));

	const medium = useMediaQuery(theme.breakpoints.down('md'));

	useEffect(() => {
		dispatch(applicationViewActions.toggleSidebar(false));
	}, [mobile]);

	const SidebarContent = (
		<React.Fragment>
			<SidebarActionItem
				text="Dashboard"
				Icon={Dashboard}
				linkUri="/dashboard"
			></SidebarActionItem>

			<SidebarActionItem
				text="Trade"
				Icon={TrendingUp}
				linkUri="/trade"
			></SidebarActionItem>

			<SidebarActionItem
				text="Portfolio"
				Icon={PieChart}
				linkUri="/portfolio"
			></SidebarActionItem>

			<SidebarActionItem
				text="Bots"
				Icon={Android}
				linkUri="/bots"
			></SidebarActionItem>

			<SidebarSpacer />

			<SidebarActionItem
				text="Help & FAQs"
				Icon={Help}
				linkUri="/settings"
			></SidebarActionItem>

			<SidebarActionItem
				text="Settings"
				Icon={Settings}
				linkUri="/settings"
			></SidebarActionItem>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<Hidden mdUp>
				<Modal
					open={isSidebarCollapsed}
					onClose={() => dispatch(applicationViewActions.toggleSidebar())}
				>
					<MobileSidebarContainer>{SidebarContent}</MobileSidebarContainer>
				</Modal>
			</Hidden>
			<Hidden smDown>
				<SidebarContainer open={!medium}>{SidebarContent}</SidebarContainer>
			</Hidden>
		</React.Fragment>
	);
};
