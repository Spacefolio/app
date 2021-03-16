import { Typography } from '@material-ui/core';
import { Story } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { FlexCardContent, FlexCardContentProps } from '../../_styles';
import { theme } from '../../_styles/Theme';

export default {
	title: 'Design/Flex Card/Flex Card Content',
	component: FlexCardContent,
};

const Template: Story<FlexCardContentProps> = ({ ...args }) => (
	<FlexCardContent {...args} />
);

export const Content = Template.bind({});
Content.args = {
	children: (
		<div>
			<Typography>hello</Typography>
		</div>
	),
};
