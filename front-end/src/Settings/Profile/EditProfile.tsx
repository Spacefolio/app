import { Typography } from '@material-ui/core';
import { title } from 'process';
import React from 'react';
import {
	ActionButton,
	FlexCard,
	FlexCardContent,
	FlexCardHeader,
  FlexSpacer,
	InlineDiv,
} from '../../_styles';
import { ProfileContainer } from '../_styles';
import { UpdateProfileForm } from './UpdateProfileForm';

interface profileProps {}

export const EditProfile: React.FC<profileProps> = ({}) => {
	return (
		<ProfileContainer>
			<FlexCard flexDirection="column">
				<FlexCardHeader>
					<InlineDiv style={{ padding: '12px' }}>
						<div>
							<InlineDiv>
								{/* <AccountBalanceWallet fontSize="small" color="primary" /> */}
								<Typography variant="h2">Edit Profile</Typography>
							</InlineDiv>
							<InlineDiv>
								<Typography variant="caption">Add your details</Typography>
							</InlineDiv>
						</div>
						<FlexSpacer></FlexSpacer>
					</InlineDiv>
				</FlexCardHeader>
				<FlexCardContent>
					<UpdateProfileForm />
				</FlexCardContent>
			</FlexCard>
		</ProfileContainer>
	);
};
