import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Application } from '../Application';
import { AlertContainer } from '../_components';
import 'typeface-roboto';
import './App.scss';
import { AppContainer } from './_styles';
import '../_styles/variables.scss';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { theme } from '../_styles/Theme';
import { Login } from '../Login/login';

export const App = () => {
	const dispatch = useDispatch();
	const alert = useSelector((state: any) => state.alert);

	const clearAlerts = alertActions.clear;

	history.listen((location: any, action: any) => {
		dispatch(clearAlerts());
	});
	return (
		<React.Fragment>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<AppContainer>
					<AlertContainer />
					<Router history={history}>
						<Switch>
							<Route exact path="/login" component={Login} />
							<PrivateRoute path="/" Component={Application} />
							<Redirect from="*" to="" />
						</Switch>
					</Router>
				</AppContainer>
			</ThemeProvider>
		</React.Fragment>
	);
};
