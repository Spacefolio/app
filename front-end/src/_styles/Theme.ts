import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { COLORS } from '.';

export const theme = createMuiTheme({
	typography: {},
	palette: {
		primary: {
			main: COLORS.primaryBase,
		},
		secondary: {
			main: COLORS.accentBase,
		},
	},
	overrides: {
		MuiTabs: {
			indicator: {
				left: 0,
				transition: 'none',
			},
		},
		MuiTab: {
			root: {
				textTransform: 'none',
				hover: {
					background: 'blue',
				},
			},
			wrapper: {
				cursor: 'pointer',
			},
		},
		MuiButton: {
			root: { color: 'black' },
		},
		MuiTextField: {
			root: { padding: 0},
		},
	},
});
