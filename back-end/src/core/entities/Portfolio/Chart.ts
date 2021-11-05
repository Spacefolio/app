export type ChartPoint = { timestamp: number, value: { USD: number } };
export type Chart = ChartPoint[];

export type ITimeframe = '24H' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';
export enum Timespan {
	H24 = '24H',
	W1 = '1W',
	M1 = '1M',
	M3 = '3M',
	M6 = '6M',
	Y1 = '1Y',
	ALL = 'ALL',
}