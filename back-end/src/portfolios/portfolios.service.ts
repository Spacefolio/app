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
	/*
	if (timeframe == timespan.W1) {
		span = 7;
		pieces = 4;
		if (timeslicesAll.length < 8) { span = timeslicesAll.length }
    
	} else if (timeframe == timespan.H24) {
    if (timeslicesAll.length < 1)
    {
      let hourlyData = new Array(24);
      let now = Date.now();
      let hour = now - (now % 3600000);
      for (let i = 0; i < 24; i++)
      {
        hour -= 3600000;
        hourlyData[i] = ({ T: hour, USD: 0 });
      }
      return hourlyData;
    }
		span = 1;
		pieces = 24;
	}

	let slicesToSplit = [];

	let previousSlice = timeslicesAll[timeslicesAll.length - span - 1];

	for (let i = timeslicesAll.length - span; i < timeslicesAll.length; i++) {
		slicesToSplit.push(timeslicesAll[i]);
	}

	if (slicesToSplit.length < 1)
	{
		return [];
	}

	let slices = await splitSlices(slicesToSplit, pieces, previousSlice);
	timeslicesNew.push(...slices);

	return timeslicesNew.map((timeslice) => {
		return { T: timeslice.start, USD: timeslice.value };
	});

	*/

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

async function splitSlices(slices: ITimeslice[], pieces: number, previousSlice?: ITimeslice) {
	let newSlices: ITimeslice[] = [];
	let currentSnapshot: { [key: string]: number } = {};
	let lastAmount: { [key: string]: number } = {};
	let lastPrice: { [key: string]: number } = {};
	let now = Date.now();
	let lastHour = now - (now % 3600000);

	if (previousSlice) {
		for (let [key, value] of Object.entries(previousSlice.holdings)) {
			lastAmount[key] = value.amount;
			lastPrice[key] = value.price;
		}
	}

	for (var [key, value] of Object.entries(slices[0].holdings)) {
		currentSnapshot[key] = 0;
		if (!previousSlice) {
			lastPrice[key] = 0;
			lastAmount[key] = 0;
		}
	}

	for (let currentDaySlice = 0; currentDaySlice < slices.length; currentDaySlice++) {
		let daySlice = slices[currentDaySlice];
		let holdingSlices: IHoldingSlice[] = [];
    let endHour = daySlice.start + (24 * 3600000);;
    let startHour = daySlice.start;
		let sliceStart = startHour;
		
		if (endHour > lastHour)
    {
      endHour = lastHour;
    }
		if (sliceStart > lastHour)
		{
			sliceStart = lastHour;
		}

		for (var [key, value] of Object.entries(daySlice.holdings)) {
			holdingSlices.push(value);
			currentSnapshot[key] = 0;
		}

		for (let i = 1; i <= pieces; i++) {
			let newTimeslice: ITimeslice = {
				start: sliceStart,
				value: 0,
				holdings: {},
			};

      sliceStart = (startHour) + ((86400000 / pieces) * (i - 1));

			let sliceEnd = startHour + (i * (86400000 / pieces));
			if (sliceEnd > lastHour)
    	{
      	sliceEnd = lastHour;
    	}
			if (sliceStart > lastHour)
			{
				break;
			}

			for (let holding = 0; holding < holdingSlices.length; holding++) {
				let holdingSlice = holdingSlices[holding];
				let snapsInThisSlice: IHoldingSnapshot[] = [];
				const currentAsset = holdingSlice.asset;
        const hourlyPrices = await getHourlyData(currentAsset, sliceStart, sliceEnd);

				for (let j = currentSnapshot[currentAsset]; j < holdingSlice.snapshots.length; j++) {
					let snap = holdingSlice.snapshots[j];

					if (snap.timestamp < sliceEnd) {
						snapsInThisSlice.push(snap);
						lastAmount[currentAsset] = snap.totalAmountBought - snap.totalAmountSold;
						lastPrice[currentAsset] = snap.price.USD;
						currentSnapshot[currentAsset]++;
					} else {
						break;
					}
				}

        let currentPrice = hourlyPrices.find((hourlyPrice) => hourlyPrice.hour == sliceStart);
        if (currentPrice != undefined) { lastPrice[currentAsset] = currentPrice.price; }
				let value = lastAmount[currentAsset] * lastPrice[currentAsset];

				let newHoldingSlice = {
					asset: currentAsset,
					amount: lastAmount[currentAsset],
					price: lastPrice[currentAsset],
					value: value,
					snapshots: snapsInThisSlice,
				};

				newTimeslice.holdings[currentAsset] = newHoldingSlice;
				newTimeslice.value += value;
			}

			newSlices.push(newTimeslice);
			sliceStart = sliceEnd;
		}
	}

	return newSlices;
}