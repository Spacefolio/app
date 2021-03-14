import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { COLORS } from '.';

export const theme = createMuiTheme({
	typography: {
		subtitle2: {
			fontSize: '1rem',
			opacity: 0.7,
		},
		h2: {
			fontSize: '1.25rem',
			letterSpacing: '.02em',
			lineHeight: '1rem',
			fontWeight: 500,
		},
		caption: { opacity: 0.6 },
		button: {
			fontSize: '.8rem',
			textTransform: 'none',
			fontWeight: 500,
		},
		body2: {
			letterSpacing: 0,
			fontSize: '.75rem',
			fontWeight: 500,
			opacity: 0.8,
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
