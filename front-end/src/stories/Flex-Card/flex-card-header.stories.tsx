import { ThemeProvider, Typography } from '@material-ui/core';
import { AccountBalanceWallet } from '@material-ui/icons';
import { Story } from '@storybook/react';
import React from 'react';
import {
	ActionButton,
	FlexCardContent,
	FlexCardHeader,
	FlexCardHeaderProps,
	InlineDiv,
} from '../../_styles';
import { theme } from '../../_styles/Theme';

export default {
	title: 'Design/Flex Card/Flex Card Header',
	component: FlexCardHeader,
	argTypes: {
		title: { control: 'text' },
		caption: { control: 'text' },
		top: { control: 'number' },
		side: { control: 'number' },
	},
};

const Template: Story<any> = ({ title, caption, ...args }) => (
	<FlexCardHeader {...args}>
		<InlineDiv style={{ padding: '12px' }}>
			<div>
				<InlineDiv>
					{/* <AccountBalanceWallet fontSize="small" color="primary" /> */}
					<Typography variant="h2">{title}</Typography>
				</InlineDiv>
				<InlineDiv>
					<Typography variant="caption">{caption}</Typography>
				</InlineDiv>
			</div>
			<div style={{ width: '100%' }}></div>
			<ActionButton size="small" color="primary" variant="contained">
				<Typography variant="button">Test Button</Typography>
			</ActionButton>
		</InlineDiv>
	</FlexCardHeader>
);

export const Header = Template.bind({});
Header.args = {
	title: 'Flex Card Header Title',
	caption: 'Flex Card Header Caption',
	top: 1,
	side: 1,
};
