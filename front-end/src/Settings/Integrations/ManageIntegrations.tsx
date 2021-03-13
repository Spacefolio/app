import { Fab, Menu, MenuList, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AddIntegrationPopup, ListMyExchanges } from '../../Integrations';
import { applicationViewActions } from '../../_actions/applicationView.actions';
import { BaseButton, CustomFlexCard } from '../../_styles';
import { IntegrationsContainer } from '../_styles';

interface ManageIntegrationsProps {}

export const ManageIntegrations: React.FC<ManageIntegrationsProps> = ({}) => {
	const dispatch = useDispatch();

	return (
		<IntegrationsContainer>
			<CustomFlexCard
				style={{
					width: '100%',
					flexDirection: 'column',
					padding: '20px',
					gridArea: 'profileinfo',
					gap: '20px',
				}}
			>
				<div>
					<Typography variant="h5">My Integrations</Typography>
					<Typography variant="caption" color="textSecondary">
						Add, edit or delete your integrations
					</Typography>
				</div>
				<MenuList>
					<ListMyExchanges enableEditing={true} />
				</MenuList>
				<Fab
					variant="extended"
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
				</Fab>
				{/* <Fab color="primary">
					<Add />
				</Fab> */}
			</CustomFlexCard>
			<CustomFlexCard
				style={{
					width: '100%',
				}}
			>
				sdfghfgd
			</CustomFlexCard>
		</IntegrationsContainer>
	);
};
