import React from 'react';

import{ ButtonTypeMap } from '@material-ui/core/Button';

import { ActionButton } from '../_styles/Buttons';
import { ExtendButtonBase, Typography } from '@material-ui/core';
import { Story } from '@storybook/react';

export default {
	title: 'Button',
	component: ActionButton,
};

const Template: Story<ExtendButtonBase<ButtonTypeMap>> = ({
	children,
	...rest
}) => (
	<ActionButton {...rest}>
		<Typography variant="button">{children}</Typography>
	</ActionButton>
);

export const Default = Template.bind({});
Default.args = {
	children: 'Default',
};

export const Primary = Template.bind({});
Primary.args = {
	color: 'blue',
	variant: 'contained',
	children: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
	color: 'secondary',
	variant: 'contained',
	children: 'Secondary',
};
