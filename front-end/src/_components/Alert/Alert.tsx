import React from 'react';
import { ReactReduxContext, useDispatch, useSelector } from 'react-redux';
import { alertActions } from '../../_actions';
import { AlertWrapper } from './_styles';
import { IRootState } from '../../_reducers';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export const AlertContainer = () => {
	const dispatch = useDispatch();

	const alert = useSelector((state: IRootState) => state.alert);

	return (
		<AlertWrapper>
			<Snackbar
				open={alert.message != undefined}
				autoHideDuration={4000}
				onClose={() => dispatch(alertActions.clear())}
			>
				<Alert
					variant="filled"
					onClose={() => dispatch(alertActions.clear())}
					severity={alert.type}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</AlertWrapper>
	);
};
export const ViewLoading = () => {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</div>
	);
};
