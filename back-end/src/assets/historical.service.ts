import axios from 'axios';
import moment from 'moment';
import { coindataService } from './coindata.service';
import { HistoricalData, HourlyData, IHourlyPrice } from './historical.model';

interface IHistoricalCandleResponse {
	day: number;
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	adjClose: number;
	volume: number;
	unadjustedVolume: number;
	change: number;
	changePercent: number;
	vwap: number;
	label: string;
	changeOverTime: number;
}

interface IHistoricalDataResponse {
	prices: [number, number][]; // time and price
}

interface ITickerResponse {
	symbol: string;
	name: string;
	price: number;
	changesPercentage: number;
	change: number;
	dayLow: number;
	dayHigh: number;
	yearhHigh: number;
	yearLow: number;
	marketCap: number;
	priceAvg50: number;
	priceAvg200: number;
	volume: number;
	avgVolume: number;
	exchange: string;
	open: number;
	previousClose: number;
	sharesOutstanding: number;
	timestamp: number;
}

export async function loadHistoricalDataToDb(symbol: string) {
	let coinId = await coindataService.getCoinId(symbol);

	var historicalDataJson = await axios
		.get<IHistoricalDataResponse>(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10000`
		)
		.then((jsonResponse) => jsonResponse.data)
		.catch((err) => {
			throw err;
		});

	const historicalData = new HistoricalData({ symbol });

	for (let i = 0; i < historicalDataJson.prices.length; i++) {
		let timestamp: number = historicalDataJson.prices[i][0];
		historicalData.prices.push({
			price: historicalDataJson.prices[i][1],
			timestamp,
		});
	}

	const savedData = await historicalData
		.save()
		.then((res) => res)
		.catch((err) => {
			throw err;
		});
	return savedData;
}

export function fiat(symbol: string) {
	switch (symbol) {
		case 'USD':
		case 'USD/USD':
			return 1;
		default:
			return 0;
	}
}

export async function loadHourlyData(symbol: string) {
	const coinId = await coindataService.getCoinId(symbol);
	const now = Date.now() / 1000;

	var toTimestamp = now;
	let lastHour = now - (now % 3600);
	var fromTimestamp = lastHour - 691200; // subtract 8 days (in seconds) to get one week ago

	var hourlyDataJson = await axios
		.get<IHistoricalDataResponse>(
			`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`
		)
		.then((jsonResponse) => jsonResponse.data)
		.catch((err) => {
			throw err;
		});

	var hourlyData = await HourlyData.findOne({ symbol });
	if (!hourlyData) {
		hourlyData = new HourlyData({ symbol });
	}

	for (let i = 0; i < hourlyDataJson.prices.length; i++) {
		let timestamp: number = hourlyDataJson.prices[i][0];
		let hour =
			timestamp % 3600000 >= 1800000
				? timestamp + (3600000 - (timestamp % 3600000))
				: timestamp - (timestamp % 3600000); // round to nearest hour
		hourlyData.prices.push({ hour, price: hourlyDataJson.prices[i][1] });
	}

	const savedData = await hourlyData
		.save()
		.then((res) => res)
		.catch((err) => {
			throw err;
		});
	return savedData;
}

export async function getHourlyData(
	symbol: string,
	from: number,
	to: number
): Promise<IHourlyPrice[]> {
	var hourlyPrices: IHourlyPrice[] = [];

	from = from - (from % 3600000); // round down to nearest hour
	to = to - (to % 3600000);

	if (fiat(symbol)) {
		for (let i = from; i < to; i += 3600000) {
			hourlyPrices.push({ hour: i, price: 1 });
		}

		return hourlyPrices;
	}

	var hourlyData = await HourlyData.findOne({ symbol });
	if (!hourlyData) {
		await loadHourlyData(symbol);
		hourlyData = await HourlyData.findOne({ symbol });
		if (!hourlyData)
			throw `Could not fetch hourly price data for symbol '${symbol}'. [1]`;
	}

	var startIndex = hourlyData.prices.findIndex(
		(hourData) => hourData.hour == from
	);
	var lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;

	if (startIndex == -1 || lastHour < to) {
		hourlyData = await loadHourlyData(symbol);
		startIndex = hourlyData.prices.findIndex(
			(hourData) => hourData.hour == from
		);
		lastHour = hourlyData.prices[hourlyData.prices.length - 1].hour;
		if (startIndex == -1 || lastHour < to)
			throw `Could not fetch hourly price data for symbol '${symbol}'. [2]`;
	}

	var endIndex = hourlyData.prices.findIndex((hourData) => hourData.hour == to);
	if (endIndex == -1)
		throw `Could not fetch hourly price data for symbol '${symbol}'. [3]`;

	for (let i = startIndex; i < endIndex; i++) {
		hourlyPrices.push(hourlyData.prices[i]);
	}

	return hourlyPrices;
}

export async function getHistoricalData(
	symbol: string,
	timestamp: number
): Promise<number> {
	var symbols = symbol.split('/');
	var historicalData = await HistoricalData.findOne({ symbol: symbols[0] });
	if (!historicalData) {
		historicalData = await loadHistoricalDataToDb(symbols[0]);
		if (!historicalData) {
			return 1;
		}
	}
	const date = timestamp - (timestamp % 86400000);
	const candle = historicalData.prices.find(
		(candle) => candle.timestamp == date
	);
	if (!candle) return 1;
	return candle.price;
}
