import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import { ActionButton, StyledFormRow } from '../_styles';
import { IRootState } from '../_reducers';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	Link,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';
import { userService } from '../_services';
import { emailTester } from '../_helpers';

export const Login = () => {
	const [email, setEmail] = useState('');

	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');

	const [passwordCheck, setPasswordCheck] = useState('');

	const [submitted, setSubmitted] = useState(false);

	const [headerText, setHeaderText] = useState('Enter Email');

	const [headerSubText, setHeaderSubText] = useState(
		'Enter your account email address to login or a new one to register an account'
	);

	const [isEmailRegistered, setIsEmailRegistered] = useState();

	const [formType, setFormType] = useState('CheckRegistration');

	const dispatch = useDispatch();

	function CheckEmail() {
		userService
			.registrationCheck(email)
			.then((res) => setIsEmailRegistered(res.registered));
	}

	function handleSubmit(e: any) {
		e.preventDefault();

		setSubmitted(true);
		if (formType == 'CheckRegistration' && emailTester(email)) {
			CheckEmail();
		} else if (formType == 'login' && emailTester(email) && password) {
			dispatch(userActions.login({ email, password }));
		} else if (
			formType == 'register' &&
			emailTester(email) &&
			password &&
			password == passwordCheck
		) {
			dispatch(userActions.register({ email, password, username }));
		}
	}

	useEffect(() => {
		email == null && setFormType('CheckRegistration');
		if (formType == 'login') {
			setHeaderText('Login');
			setHeaderSubText('Enter your password to login');
		}
		if (formType == 'register') {
			setHeaderText('Sign Up');
			setHeaderSubText('Enter your username and password to sign up');
		}
		if (formType == 'CheckRegistration') {
			setHeaderText('Enter Email');
			setHeaderSubText(
				'Enter your account email address to login or a new one to register an account'
			);
		}
	}, [formType, email]);

	useEffect(() => {
		if (isEmailRegistered != undefined) {
			if (isEmailRegistered) {
				setFormType('login');
			} else {
				setFormType('register');
			}
		}
	}, [isEmailRegistered]);

	return (
		<Container>
			<Grid style={{ paddingTop: '30%' }} xs={12} container>
				<Grid direction="column" justify="center" alignItems="center" container>
					<Typography align="justify" component="h1" variant="h5">
						{headerText}
					</Typography>
					<Typography>{headerSubText}</Typography>
				</Grid>
				<form style={{ width: '400px' }} onSubmit={handleSubmit}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							type="email"
							autoComplete={formType != 'CheckRegistration' ? 'email' : 'none'}
							autoFocus
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
							helperText={
								submitted && !emailTester(email)
									? 'Please enter a valid email address'
									: null
							}
						/>
					</Grid>

					{formType == 'register' ? (
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								margin="normal"
								fullWidth
								name="username"
								label="Username"
								type="text"
								id="username"
								value={username}
								onChange={(e: any) => setUsername(e.target.value)}
							/>
						</Grid>
					) : null}

					{formType == 'login' || formType == 'register' ? (
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								margin="normal"
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={password}
								onChange={(e: any) => setPassword(e.target.value)}
							/>
						</Grid>
					) : null}

					{formType == 'register' ? (
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								margin="normal"
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								autoComplete="current-password"
								value={passwordCheck}
								onChange={(e: any) => setPasswordCheck(e.target.value)}
								helperText={
									submitted &&
									password != passwordCheck &&
									'Passwords must Match.'
								}
							/>
						</Grid>
					) : null}
					<StyledFormRow style={{ justifyContent: 'center' }}>
						<ActionButton variant="contained" color="primary" type="submit">
							Sign In
						</ActionButton>
					</StyledFormRow>
				</form>
			</Grid>
		</Container>
	);
};
