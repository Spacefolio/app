import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { COLORS } from '.';

export const theme = createMuiTheme({
	typography: {
		h2: { fontSize: '1.25rem', letterSpacing: '.02em', fontWeight: 500 },
		caption: { opacity: 0.6 },
		button: {
			fontSize: '.8rem',
			textTransform: 'none',
			fontWeight: 500,
		},
	},
	palette: {
		primary: {
			main: COLORS.primaryBase,
			contrastText: 'white',
		},
		secondary: {
			main: COLORS.accentBase,
			contrastText: 'white',
		},
		error: {
			main: COLORS.errorBase,
			contrastText: 'white',
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
			label: { cursor: 'pointer' },
		},
	},
});
