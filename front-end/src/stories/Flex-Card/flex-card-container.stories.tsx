import React from 'react';
import { Story } from '@storybook/react';
import {
	FlexCard,
	FlexCardContainer,
	FlexCardContainerProps,
	FlexCardProps,
} from '../../_styles/FlexCard';

import { Flexcard } from './flex-card.stories';

export default {
	title: 'Design/Flex Card/Flex Card Container',
	component: FlexCardContainer,

};

const Template: Story<FlexCardContainerProps> = ({ children, ...args }) => (
	<FlexCardContainer {...args}>{children}</FlexCardContainer>
);

export const Main = Template.bind({});
Main.args = {
	children: (
		<React.Fragment>
			<Flexcard {...Flexcard.args} />
			<Flexcard {...Flexcard.args} />
			<Flexcard {...Flexcard.args} />
			<Flexcard {...Flexcard.args} />
		</React.Fragment>
	),
};
