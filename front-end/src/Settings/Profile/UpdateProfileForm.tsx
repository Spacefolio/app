import { Grid, TextField, Typography } from '@material-ui/core';
import { Email, Face, Person } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { time } from 'console';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserUpdateRequest, IUserView } from '../../../../types';
import { userActions } from '../../_actions';
import { emailTester } from '../../_helpers';
import { IRootState } from '../../_reducers';
import { ActionButton, InlineDiv, StyledFormRow } from '../../_styles';

interface UpdateProfileFormProps {}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({}) => {
	const user = useSelector((state: IRootState) => state.authentication.user);

	const [submitted, setSubmitted] = useState(false);

	const [fname, setFname] = useState(user.firstName ? user.firstName : '');

	const [lname, setLname] = useState(user.lastName ? user.lastName : '');

	const [username, setUsername] = useState(user.username ? user.username : '');

	const [email, setEmail] = useState(user.email && user.email);

	const [userUpdate, setUserUpdate] = useState<IUserUpdateRequest>();

	const dispatch = useDispatch();

	useEffect(() => {
		setUserUpdate({
			id: user.id,
			firstName: fname,
			lastName: lname,
			email,
			username,
		});
	}, [fname, lname, email, username]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setSubmitted(true);
		console.log(userUpdate);
		if (user.id && fname && lname && emailTester(email) && username) {
			dispatch(userActions.update(userUpdate));
		}
	};

	return (
		<form onSubmit={handleSubmit} autoComplete="off" id="update-profile-form">
			<StyledFormRow>
				<Email color={'action'} />
				<TextField
					variant="standard"
					required
					id="email"
					fullWidth
					label="Email Address"
					autoComplete="email"
					value={email}
					type="text"
					onChange={(e) => setEmail(e.target.value)}
					helperText={
						submitted && !emailTester(email)
							? 'Please enter a valid email address'
							: null
					}
				/>
			</StyledFormRow>

			<StyledFormRow>
				<Person color={'action'} />
				<TextField
					variant="standard"
					required
					id="fname"
					fullWidth
					label="First Name"
					value={fname}
					type="text"
					onChange={(e) => setFname(e.target.value)}
				/>

				<TextField
					variant="standard"
					required
					id="lanme"
					fullWidth
					label="Last Name"
					value={lname}
					type="text"
					onChange={(e) => setLname(e.target.value)}
				/>
			</StyledFormRow>

			<StyledFormRow>
				<Face color={'action'} />
				<TextField
					variant="standard"
					required
					id="username"
					fullWidth
					label="Username"
					value={username}
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>
			</StyledFormRow>
			<StyledFormRow style={{ justifyContent: 'flex-end' }}>
				<ActionButton
					variant="contained"
					color="primary"
					type="submit"
					form="update-profile-form"
					disabled={
						lname == user.lastName &&
						fname == user.firstName &&
						username == user.username &&
						email == user.email
					}
				>
					<Typography variant="button" noWrap>
						Save Changes
					</Typography>
				</ActionButton>
			</StyledFormRow>
		</form>
	);
};
