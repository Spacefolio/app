import { ITimeframe } from '../../../types';
import { COLORS, RD, SPACING } from '../_styles/ResponsiveDesign';
import { theme } from '../_styles/Theme';

export const ReformatCurrencyValue = (value: number, currencyType: string) => {
	if (value == 0) return 0;
	switch (currencyType) {
		case 'BTC':
			return value.toFixed(8);
		case 'USD':
		case 'USDC':
		case 'USDT':
			return value.toLocaleString(undefined, {
				maximumFractionDigits: 6,
				minimumFractionDigits: 0,
			});
		default:
			return value.toLocaleString(undefined, {
				maximumFractionDigits: 6,
				minimumFractionDigits: 0,
			});
	}
};

export const ReformatCurrencyValueMini = (value: number) => {
	return value.toLocaleString(undefined, {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		style: 'currency',
		currency: 'USD',
	});
};

export const ProfitColorizer = (num: number) => {
	return num < 0 ? theme.palette.error.main : theme.palette.secondary.main;
};

export const ReformatAmountValue = (value: number) => {
	return value.toLocaleString();
};

export const timeFrameSelectors: ITimeframe[] = [
	'24H',
	'1W',
	'1M',
	'3M',
	'6M',
	'1Y',
	'ALL',
];

export const emailTester = (email: string) => {
	const emailTest = new RegExp(
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
	);
	return emailTest.test(email);
};
