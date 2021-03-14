import { User } from '../users/user.model';
import { exchangeService } from '../exchanges/exchange.service';
import { mockPortfolioCalculationsFake } from '../../exchangeDataDetailed';
import { ITransactionItemView, timespan } from '../../../types';
import { IExchangeAccountDocument, IHoldingSlice, IHoldingSnapshot, ITimeslice, ITimeslices } from '../exchanges/exchange.model';
import ccxt from 'ccxt';
import { userService } from '../users/user.service';
import { spawn } from 'child_process';
import { getHourlyData } from '../coindata/historical.service';
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

async function getMetaportfolioChart(userId: string, timeframe: timespan) {
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

async function getPortfolioChart(userId: string, portfolioId: string, timeframe: timespan) {
	var exchange = await exchangeService.getById(portfolioId);

	const { timeslices } = exchange;

	if (!timeslices) { return []; }

	let timeslicesAll = Object.entries(timeslices).map(([timestamp, timeslice]: [string, ITimeslice]) => {
		return timeslice;
	});

	if (timeframe != timespan.W1 && timeframe != timespan.H24) {
		let timeslicesTrimmed: ITimeslice[] = [];
		let start = 0;
		let spanOfDays = 0;

		if (timeframe == timespan.M1) {
			spanOfDays = 30;
			start = timeslicesAll.length - 30;
		} else if (timeframe == timespan.M3) {
			spanOfDays = 90;
			start = timeslicesAll.length - 90;
		} else if (timeframe == timespan.M6) {
			spanOfDays = 182;
			start = timeslicesAll.length - 182;
		} else if (timeframe == timespan.Y1) {
			spanOfDays = 365;
			start = timeslicesAll.length - 365;
		}

		if (timeslicesAll.length < spanOfDays) {
			for (let i = 0; i < timeslicesAll.length; i++) {
				timeslicesTrimmed.push(timeslicesAll[i]);
			}
		} else {
			for (let i = start; i < timeslicesAll.length; i++) {
				timeslicesTrimmed.push(timeslicesAll[i]);
			}
		}

		return timeslicesTrimmed.map((timeslice) => {
			return { T: timeslice.start, USD: timeslice.value };
		});
	}

	let timeslicesNew = [];
	let pieces: number = 0;
	let span: number = 0;

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
		return { T: timeslice.start - 86400000, USD: timeslice.value };
	});
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
    let endHour = daySlice.start;
    let startHour = daySlice.start - (24 * 3600000);
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