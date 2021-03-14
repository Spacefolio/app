import { muiTheme } from 'storybook-addon-material-ui';

import { theme } from '../src/_styles/Theme';

import { StylesDecorator } from './styles-decorator';

export const decorators = [StylesDecorator, muiTheme([theme])];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
};
