import { Typography } from '@material-ui/core';
import React from 'react';
import { CustomFlexCard, FlexCard } from '../../_styles';
import { ProfileContainer } from '../_styles';
import { UpdateProfileForm } from './UpdateProfileForm';

interface profileProps {}

export const EditProfile: React.FC<profileProps> = ({}) => {
	return (
		<ProfileContainer>
			<CustomFlexCard
				style={{
					flexDirection: 'column',
					padding: '20px',
					gridArea: 'profileinfo',
					gap: '20px',
				}}
			>
				<div>
					<Typography variant="h5">Edit Profile</Typography>
					<Typography variant="caption" color="textSecondary">
						Add your details
					</Typography>
				</div>
				<UpdateProfileForm />
			</CustomFlexCard>
		</ProfileContainer>
	);
};
