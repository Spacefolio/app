import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export const theme = responsiveFontSizes(
	createMuiTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1250,
				xl: 1440,
			},
		},
		typography: {
			fontFamily:
				'Graphik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
			subtitle2: {
				fontSize: '1rem',
				opacity: 0.7,
			},
			h1: {
				fontSize: '2rem',
				lineHeight: 1.3,
				fontWeight: 500,
			},
			h2: {
				fontSize: '1.375rem',
				fontWeight: 500,
			},
			h3: {
				fontSize: '1.125rem',
				fontWeight: 500,
			},
			h4: {
				fontSize: '1.125rem',
				fontWeight: 400,
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
				main: '#6861ff',
				contrastText: 'white',
			},
			secondary: {
				main: '#61ff69',
				contrastText: 'white',
			},
			error: {
				main: '#ff6961',
				contrastText: 'white',
			},
		},
		overrides: {
			MuiAvatar: {
				colorDefault: { color: 'black', backgroundColor: 'transparent' },
			},
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
	})
);
