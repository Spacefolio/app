import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 650,
			md: 945,
			lg: 1920,
			xl: 2150,
		},
	},
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
			main: '#0066ff',
			contrastText: 'white',
		},
		secondary: {
			main: '#00c850',
			contrastText: 'white',
		},
		error: {
			main: '#ea0000',
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
		MuiContainer: {},
		MuiDrawer: {},
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
