import React from 'react';
import { Story } from '@storybook/react';
import { FlexCard, FlexCardProps } from '../../_styles/FlexCard';

import { Content } from './flex-card-content.stories';
import { Header } from './flex-card-header.stories';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../_styles/Theme';

export default {
	title: 'Design/Flex Card/Flex Card',
	component: FlexCard,

};

const Template: Story<FlexCardProps> = ({ children, ...args }) => (
	<FlexCard {...args}>{children}</FlexCard>
);

export const Flexcard = Template.bind({});
Flexcard.args = {
	children: (
		<React.Fragment>
			<Header {...Header.args} />
			<Content {...Content.args} />
		</React.Fragment>
	),
};

// export const Flexcard = Template.bind({});
// Flexcard.args = {
// 	children: (
// 		<React.Fragment>
// 			<Header {...Header.args} />
// 			<Content {...Content.args} />
// 		</React.Fragment>
// 	),
// };

// export const Flexcard = Template.bind({});
// Flexcard.args = {
// 	children: (
// 		<React.Fragment>
// 			<Header {...Header.args} />
// 			<Content {...Content.args} />
// 		</React.Fragment>
// 	),
// };

// export const Flexcard = Template.bind({});
// Flexcard.args = {
// 	children: (
// 		<React.Fragment>
// 			<Header {...Header.args} />
// 			<Content {...Content.args} />
// 		</React.Fragment>
// 	),
// };
