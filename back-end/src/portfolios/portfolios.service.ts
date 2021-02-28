import { User } from "../users/user.model";
import { exchangeService } from "../exchanges/exchange.service";
import { mockPortfolioCalculationsFake } from "../../exchangeDataDetailed";
import { ITransactionItemView, timespan } from "../../../types";
import { IExchangeAccountDocument, IHoldingSlice, IHoldingSnapshot, ITimeslice, ITimeslices } from "../exchanges/exchange.model";
import ccxt from "ccxt";
import { userService } from "../users/user.service";
import { spawn } from "child_process";

export const portfolioService = {
  getAll,
  get,
  sync,
  getPortfolioChart,
  getMetaportfolioChart
};

async function sync(userId: string) {
  return await exchangeService
        .syncAllExchangesData(userId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function getAll(userId: string) {
  return await exchangeService
        .getExchangesData(userId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function get(userId: string, exchangeId: string) {
  return await exchangeService
        .getExchangeData(userId, exchangeId)
        .then((portfolioData) => {
          //console.log(res)
          return portfolioData;
        }).catch((err) => { throw err; });
}

async function getMetaportfolioChart(userId: string, timespan: timespan) {
  var user = await userService.getById(userId);
  if (!user) throw "user not found";

  let timeslices: ITimeslices = {};

  for (let exchangeId of user.linkedExchanges)
  {
    const exchangeDocument = await exchangeService.getById(exchangeId);

    Object.entries(exchangeDocument.timeslices).forEach(([timestamp, timeslice]:[string, ITimeslice]) => {
      if (!timeslices[timeslice.start])
      {
        timeslices[timeslice.start] = timeslice;
      }
      else
      {
        timeslices[timeslice.start].value += timeslice.value;
      }
    });
  }

  return Object.entries(timeslices).map(([timestamp, timeslice]:[string, ITimeslice]) => {
    return { T: timeslice.start, USD:timeslice.value };
  });

}

async function getPortfolioChart(userId: string, portfolioId: string, timeframe: timespan) {
  var exchange = await exchangeService.getById(portfolioId);

  const { timeslices } = exchange;

  let timeslicesAll = Object.entries(timeslices).map(([timestamp, timeslice]:[string, ITimeslice]) =>
  {
    return timeslice;
  });

  if (timeframe != timespan.W1 && timeframe != timespan.H24)
  {
    let timeslicesTrimmed: ITimeslice[] = [];
    let start = 0;
    let spanOfDays = 0;

    if (timeframe == timespan.M1)
    {
      spanOfDays = 30;
      start = timeslicesAll.length - 30;
    }
    else if (timeframe == timespan.M3)
    {
      spanOfDays = 90;
      start = timeslicesAll.length - 90;
    }
    else if (timeframe == timespan.M6)
    {
      spanOfDays = 182;
      start = timeslicesAll.length - 182;
    }
    else if (timeframe == timespan.Y1)
    {
      spanOfDays = 365;
      start = timeslicesAll.length - 365;
    }

    if (timeslicesAll.length < spanOfDays)
    {
      for (let i = 0; i < timeslicesAll.length; i++)
      {
        timeslicesTrimmed.push(timeslicesAll[i]);
      }
      /*
      let timeslicesNew: ITimeslice[] = [];
      let missingDays = spanOfDays - timeslicesAll.length;
      if (timeslicesAll.length > 0)
      {
        let start = timeslicesAll[0].start;
        for (let i = 0; i < missingDays; i++)
        {
          let newStart = start - ((i + 1) * 86400000)
          timeslicesNew.push({
            start: newStart,
            value: 0,
            holdings: {}
          });
        }

        timeslicesTrimmed = [ ...timeslicesNew, ...timeslicesAll ];
      }
      */
    } else {
      for (let i = start; i < timeslicesAll.length; i++)
      {
        timeslicesTrimmed.push(timeslicesAll[i]);
      }
    }

    return timeslicesTrimmed.map((timeslice) => {
      return { T: timeslice.start, USD:timeslice.value };
    });
  }

  let timeslicesNew = [];
  let pieces: number = 0;
  let span: number = 0;

  if (timeframe == timespan.W1)
  {
    span = 7;
    pieces = 4;
  }
  else if (timeframe == timespan.H24)
  {
    span = 1;
    pieces = 24;
  }

  let slicesToSplit = [];

  let previousSlice = timeslicesAll[timeslicesAll.length - span - 1];

  for (let i = timeslicesAll.length - span; i < timeslicesAll.length; i++)
  {
    slicesToSplit.push(timeslicesAll[i]);
  }

  let slices = await splitSlices(slicesToSplit, pieces, previousSlice);
  timeslicesNew.push(...slices);

  return timeslicesNew.map((timeslice) => {
    return { T: timeslice.start, USD: timeslice.value };
  });
}

async function splitSlices(slices: ITimeslice[], pieces: number, previousSlice?: ITimeslice)
{
  let newSlices: ITimeslice[] = [];
  let currentSnapshot: { [key: string]: number } = {};
  let lastAmount: { [key: string]: number } = {};
  let lastPrice: { [key: string]: number } = {};

  if (previousSlice)
  {
    for (let [key, value] of Object.entries(previousSlice.holdings))
    {
        lastAmount[key] = value.amount;
        lastPrice[key] = value.price;
    }
  }

  for (var [key, value] of Object.entries(slices[0].holdings))
  {
      currentSnapshot[key] = 0;
      if (!previousSlice)
      {
        lastPrice[key] = 0;
        lastAmount[key] = 0;
      }
  }

  for (let currentSlice = 0; currentSlice < slices.length; currentSlice++)
  {
    let slice = slices[currentSlice];
    let sliceStart = slice.start;
    let holdingSlices: IHoldingSlice[] = [];

    for (var [key, value] of Object.entries(slice.holdings))
    {
      holdingSlices.push(value);
      currentSnapshot[key] = 0;
    }

    for (let i = 1; i <= pieces; i++)
    {
      let newTimeslice: ITimeslice = {
        start: sliceStart,
        value: 0,
        holdings: {}
      }

      let sliceEnd = slice.start + (i * 86400000/pieces);

      for (let holding = 0; holding < holdingSlices.length; holding++)
      {
        let holdingSlice = holdingSlices[holding];
        let snapsInThisSlice: IHoldingSnapshot[] = [];
        const currentAsset = holdingSlice.asset;

        for (let j = currentSnapshot[currentAsset]; j < holdingSlice.snapshots.length; j++)
        {
          let snap = holdingSlice.snapshots[j];

          if (snap.timestamp < sliceEnd)
          {
            snapsInThisSlice.push(snap);
            lastAmount[currentAsset] = snap.totalAmountBought - snap.totalAmountSold;
            lastPrice[currentAsset] = snap.price.USD;
            currentSnapshot[currentAsset]++;
          }
          else { break; }
        }

        let value = lastAmount[currentAsset] * lastPrice[currentAsset];

        
        let newHoldingSlice = {
          asset: currentAsset,
          amount: lastAmount[currentAsset],
          price: lastPrice[currentAsset],
          value: value,
          snapshots: snapsInThisSlice
        };

        newTimeslice.holdings[currentAsset] = newHoldingSlice;
        newTimeslice.value += value;
      }

      newSlices.push(newTimeslice)
      sliceStart = sliceEnd;
    }
  }

  return newSlices;
}