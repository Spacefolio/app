import { Button, Portal, Tab, Tabs, ThemeProvider } from '@material-ui/core';

import React, { useEffect, useState } from 'react';
import {
	Route,
	Switch,
	useHistory,
	useLocation,
	useParams,
} from 'react-router';
import { CustomFlexCard, FlexCard, GrowFromZero } from '../_styles';
import { theme } from '../_styles/Theme';
import { StyledTabs, StyledTab } from '../portfolio/Styles';
import { Modal } from '../_components';
import { SettingsWrapper } from './_styles';
import { EditProfile } from './Profile/EditProfile';

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
	const [value, setValue] = useState(0);

	const history = useHistory();

	const location = useLocation();

	const path = '/settings';

	useEffect(() => {
		if (location.pathname == path) {
			history.push(`${path}/profile`);
		}
	}, []);

	const SettingsTabs = (
		<StyledTabs
			value={value}
			indicatorColor="primary"
			onChange={(e, val) => {
				setValue(val);
			}}
		>
			<StyledTab
				label="Profile"
				onClick={() => history.push(`${path}/profile`)}
			></StyledTab>
			<StyledTab
				label="Integrations"
				onClick={() => history.push(`${path}/integrations`)}
			></StyledTab>
			<StyledTab
				label="Subscription"
				onClick={() => history.push(`${path}/subscription`)}
			></StyledTab>
			<StyledTab
				label="Referral"
				onClick={() => history.push(`${path}/referral`)}
			></StyledTab>
		</StyledTabs>
	);
	return (
		<ThemeProvider theme={theme}>
			<SettingsWrapper>
				<CustomFlexCard>{SettingsTabs}</CustomFlexCard>
				<Switch>
					<Route exact path={`${path}/profile`}>
				
							<EditProfile />
			
					</Route>
					<Route exact path={`${path}/integrations`}>
						<div>dfgh;kfja</div>
					</Route>
					<Route exact path={`${path}/holdings`}>
						<div>saasdfdl;kfja</div>
					</Route>
				</Switch>
			</SettingsWrapper>
		</ThemeProvider>
	);
};
