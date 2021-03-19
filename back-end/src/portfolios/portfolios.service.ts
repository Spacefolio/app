import { User } from '../users/user.model';
import { exchangeService } from '../exchanges/exchange.service';
import { mockPortfolioCalculationsFake } from '../../exchangeDataDetailed';
import { IPortfolioLineChartItem, ITransactionItemView, timespan } from '../../../types';
import { IExchangeAccountDocument, IHoldingSlice, IHoldingSnapshot, ITimeslice, ITimeslices } from '../exchanges/exchange.model';
import ccxt from 'ccxt';
import { userService } from '../users/user.service';
import { spawn } from 'child_process';
import { getHourlyData, getLatestHourlyTimeSeries } from '../coindata/historical.service';
import { IHourlyPrice } from '../coindata/historical.model';

export const portfolioService = {
	getAll,
	get,
	sync,
	getPortfolioChart,
	getMetaportfolioChart,
};

async function sync(userId: string) {
	return await exchangeService
		.syncAllExchangesData(userId)
		.then((portfolioData) => {
			//console.log(res)
			return portfolioData;
		})
		.catch((err) => {
			throw err;
		});
}

async function getAll(userId: string) {
	return await exchangeService
		.getExchangesData(userId)
		.then((portfolioData) => {
			//console.log(res)
			return portfolioData;
		})
		.catch((err) => {
			throw err;
		});
}

async function get(userId: string, exchangeId: string) {
	return await exchangeService
		.getExchangeData(userId, exchangeId)
		.then((portfolioData) => {
			//console.log(res)
			return portfolioData;
		})
		.catch((err) => {
			throw err;
		});
}

async function getMetaportfolioChart(userId: string, timeframe: timespan) : Promise<IPortfolioLineChartItem[]> {
	var user = await userService.getById(userId);
	if (!user) throw 'user not found';

	let timeslices: ITimeslices = {};

	for (let exchangeId of user.linkedExchanges) {
		const chartData = await getPortfolioChart(userId, exchangeId, timeframe);

		for (let i = 0; i < chartData.length; i++)
		{
			if (!timeslices[chartData[i].T])
			{
				timeslices[chartData[i].T] = { start: chartData[i].T, value: chartData[i].USD, holdings: {} };
			}
			else
			{
				timeslices[chartData[i].T].value += chartData[i].USD;
			}
		}
	}

	return Object.entries(timeslices).map(([timestamp, value]: [string, ITimeslice]) => {
		return { T: value.start, USD: value.value };
	});
}

async function getPortfolioChart(userId: string, portfolioId: string, timeframe: timespan): Promise<IPortfolioLineChartItem[]> {
	var exchange = await exchangeService.getById(portfolioId);
	if (!exchange) { throw "Unable to retrieve exchange account"; }
	const timeslices: ITimeslice[] = Object.values(exchange.timeslices);
	
	if (!timeslices || timeslices.length < 1) { return []; }
	if (timeframe == timespan.H24) { return await getTwentyFourHourChart(exchange, timeslices); }
	if (timeframe == timespan.W1) { return await getOneWeekChart(exchange, timeslices); }
	return getDailyChart(timeframe, timeslices);
}

async function getTwentyFourHourChart(exchangeAccount: IExchangeAccountDocument, timeslices: ITimeslice[]): Promise<IPortfolioLineChartItem[]>
{
	// Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
	// if this is already cached, we can just return it as is. If there is partial data available,
	// we will append the latest data and return the whole series.
	let hourlyTimeSeries = await getLatestHourlyTimeSeries(exchangeAccount, timeslices);
	return hourlyTimeSeries.slice(hourlyTimeSeries.length - 24);
}

async function getOneWeekChart(exchangeAccount: IExchangeAccountDocument, timeslices: ITimeslice[]): Promise<IPortfolioLineChartItem[]>
{
	// Generate hourly time series for last 7 days (last whole hour and 167 previous hours)
	// if this is already cached, we can just return it as is. If there is partial data available,
	// we will append the latest data and return the whole series.
	let hourlyTimeSeries = await getLatestHourlyTimeSeries(exchangeAccount, timeslices);
	return hourlyTimeSeries.slice(hourlyTimeSeries.length - 168);
}

function getDailyChart(timeframe: timespan, timeslicesAll: ITimeslice[]): IPortfolioLineChartItem[] {
	// Return the last span of n days based on the timespan provided
	let timeseries = [];
	let spanOfDays = getNumberOfDaysForTimespan(timeframe);
	let start = timeslicesAll.length < spanOfDays ? 0 : timeslicesAll.length - spanOfDays;

	for (let i = start; i < timeslicesAll.length; i++) {
		timeseries.push({ T: timeslicesAll[i].start, USD: timeslicesAll[i].value });
	}

	return timeseries;
}

function getNumberOfDaysForTimespan(timeframe: timespan) {
	switch (timeframe) {
		case timespan.ALL:
			return 100000000;
		case timespan.M1:
			return 30;
		case timespan.M3:
			return 90;
		case timespan.M6:
			return 182;
		case timespan.Y1:
			return 365;
		default:
			return 0;
	}
}