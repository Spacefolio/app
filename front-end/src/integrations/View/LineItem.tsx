import { ModifyContainer, MyExchangesLineItemContainer } from './_styles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Avatar,
	ListItemAvatar,
	MenuItem,
	Portal,
	Typography,
	ListItemText,
} from '@material-ui/core';

import { Delete, Edit, Work } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IExchangeAccountView } from '../../../../types';
import { exchangeActions, portfolioActions } from '../../_actions';
import { IRootState } from '../../_reducers';
import { COLORS, SvgWrapperButton } from '../../_styles';
import { theme } from '../../_styles/Theme';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { EditIntegrationForm } from '../Edit/EditIntegrationForm';
import moment from 'moment';

interface ExchangeItemProps {
	data: IExchangeAccountView;
	enableEditing: boolean;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
	data,
	enableEditing,
}) => {
	const dispatch = useDispatch();

	const [isDeleteOpen, setIsDeleteOpen] = useState(false);

	function handleClose(shouldDelete: boolean) {
		if (shouldDelete) {
			dispatch(exchangeActions.delete(data.id));
		} else {
			setIsDeleteOpen(false);
		}
	}
	const DeleteButtonSection = (
		<React.Fragment>
			<Delete
				fontSize="large"
				color="action"
				onClick={() => setIsDeleteOpen(true)}
			/>

			{isDeleteOpen && (
				<Portal>
					<Dialog
						open={isDeleteOpen}
						onClose={() => setIsDeleteOpen(false)}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{`Remove ${data.name}`}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Removing an integration from Spacefolio is permanent. Restoring it
								to your account will require you to re-enter your API keys. Do
								you wish to continue?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => handleClose(false)}>Cancel</Button>
							<Button
								variant="contained"
								onClick={() => handleClose(true)}
								style={{
									background: theme.palette.error.main,
									color: theme.palette.error.contrastText,
								}}
							>
								Delete
							</Button>
						</DialogActions>
					</Dialog>
				</Portal>
			)}
		</React.Fragment>
	);

	const EditButtonSection = (
		<Edit
			fontSize="large"
			color="action"
			onClick={() => {
				dispatch(
					applicationViewActions.setModal(
						true,
						<EditIntegrationForm data={data} />,
						'Edit Integration'
					)
				);
			}}
		/>
	);

	return (
		<React.Fragment>
			<MenuItem
				button={true}
				key={data.id}
			>
				<ListItemAvatar>
					<Avatar src={data.logoUrl} />
				</ListItemAvatar>
				<ListItemText>{data.nickname}</ListItemText>

				{enableEditing && (
					<ModifyContainer>
						{EditButtonSection}
						{DeleteButtonSection}
					</ModifyContainer>
				)}
			</MenuItem>
		</React.Fragment>
	);
};
