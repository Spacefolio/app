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

interface SidebarNavProps {}

export const SidebarNav: React.FC<SidebarNavProps> = () => {
	const dispatch = useDispatch();

	const isSidebarCollapsed = useSelector(
		(state: IRootState) => state.applicationView.isSidebarCollapsed
	);

	const mobile = useMediaQuery(theme.breakpoints.up('md'));

	const [mobileSidebar, setMobileSidebar] = useState(false);

	useEffect(() => {
		setMobileSidebar(false);
	}, [mobile]);

	useEffect(() => {
		setMobileSidebar(!mobileSidebar);
	}, [isSidebarCollapsed]);

	const SidebarContent = (
		<React.Fragment>
			<SidebarActionItem
				text="Dashboard"
				icon={<Dashboard />}
				linkUri="/dashboard"
			></SidebarActionItem>

			<SidebarActionItem
				text="Trade"
				icon={<TrendingUp />}
				linkUri="/trade"
			></SidebarActionItem>

			<SidebarActionItem
				text="Portfolio"
				icon={<PieChart />}
				linkUri="/portfolio"
			></SidebarActionItem>

			<SidebarActionItem
				text="Bots"
				icon={<Android />}
				linkUri="/bots"
			></SidebarActionItem>

			<SidebarSpacer />

			<SidebarActionItem
				text="Help & FAQs"
				icon={<Help />}
				linkUri="/settings"
			></SidebarActionItem>

			<SidebarActionItem
				text="Settings"
				icon={<Settings />}
				linkUri="/settings"
			></SidebarActionItem>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<Hidden mdUp>
				<Modal onClose={() => setMobileSidebar(false)} open={mobileSidebar}>
					<MobileSidebarContainer>{SidebarContent}</MobileSidebarContainer>
				</Modal>
			</Hidden>
			<Hidden smDown>
				<SidebarContainer open={isSidebarCollapsed}>
					{SidebarContent}
				</SidebarContainer>
			</Hidden>
		</React.Fragment>
	);
};
