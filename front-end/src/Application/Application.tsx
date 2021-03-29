import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Portfolio } from '../Portfolio';
import { Dashboard } from '../Dashboard';
import { SidebarNav, TopNav } from '../Nav';
import { ApplicationContainer, BodyWrapper } from './_styles';
import { IRootState } from '../_reducers';
import { Settings } from '../Settings';
import { Container, useMediaQuery } from '@material-ui/core';
import { Bots } from '../Bots';
import { Trade } from '../Trade';
import { Modal } from '../_components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { theme } from '../_styles/Theme';

export const Application = () => {
	const dispatch = useDispatch();

	const mobile = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<React.Fragment>
				<Modal />
				<BodyWrapper>
					<SidebarNav />
					<ApplicationContainer>
						<TopNav />
						<Container
							id="content-container"
							disableGutters={!mobile}
							maxWidth={'xl'}
							style={{ overflowX: 'hidden' }}
						>
							<Switch>
								<Route path={`/portfolio`}>
									<Portfolio />
								</Route>
								<Route exact path={`/dashboard`}>
									<Dashboard />
								</Route>
								<Route path={'/settings'}>
									<Settings />
								</Route>
								<Route exact path={'/bots'}>
									<Bots />
								</Route>
								<Route exact path={'/trade'}>
									<Trade />
								</Route>
								<Redirect to="/dashboard" />
							</Switch>
						</Container>
					</ApplicationContainer>
				</BodyWrapper>
			</React.Fragment>
		</MuiPickersUtilsProvider>
	);
};
