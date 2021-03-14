import React from 'react';

import { StylesProvider } from '@material-ui/styles';

export const StylesDecorator = (storyFn) => (
	<StylesProvider injectFirst>{storyFn()}</StylesProvider>
);