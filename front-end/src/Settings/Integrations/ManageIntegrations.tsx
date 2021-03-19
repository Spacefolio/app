import {
	CardActions,
	CardContent,
	CardHeader,
	Fab,
	Menu,
	MenuList,
	Typography,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AddIntegrationPopup, ListMyExchanges } from '../../Integrations';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { ActionButton, FlexCard } from '../../_styles';
import { IntegrationsContainer } from '../_styles';

interface ManageIntegrationsProps {}

export const ManageIntegrations: React.FC<ManageIntegrationsProps> = ({}) => {
	const dispatch = useDispatch();

	return (
		<IntegrationsContainer>
			<FlexCard fullWidth>
				<CardHeader>
					<Typography variant="h5">My Integrations</Typography>
					<Typography variant="caption" color="textSecondary">
						Add, edit or delete your integrations
					</Typography>
				</CardHeader>
				<CardContent>
					<MenuList>
						<ListMyExchanges enableEditing={true} />
					</MenuList>
				</CardContent>
				<CardActions>
					<ActionButton
						variant="contained"
						color="primary"
						onClick={() =>
							dispatch(
								applicationViewActions.setModal(
									true,
									<AddIntegrationPopup />,
									'Add Integration'
								)
							)
						}
					>
						<Typography variant="button">Add Integration</Typography>
					</ActionButton>
				</CardActions>
				{/* <Fab color="primary">
					<Add />
				</Fab> */}
			</FlexCard>
		</IntegrationsContainer>
	);
};
