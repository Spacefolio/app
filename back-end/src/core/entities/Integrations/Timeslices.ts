import { IHolding, ITimeslices } from ".";
import { IHistoricalPrice } from "./Asset";
import { GetHistoricalValuesHandler } from "./Exchanges/ExchangeAccount";
import { IHoldingSnapshot } from "./HoldingSnapshot";
import { IHoldingSlice, ITimeslice, ONE_DAY, ONE_HOUR, ONE_WEEK } from "./Timeslice";

class Timeslices {

  static async createDailyTimeslices(holdings: IHolding[], oldTimeslices: ITimeslices, lastSynced: Date, getHistoricalValues: GetHistoricalValuesHandler): Promise<ITimeslices> {
    const timeslices: ITimeslices = new Map<number, ITimeslice>();
    const prices: { [key: string]: { [key: number]: IHistoricalPrice } } = {};
    const lastAmount: { [key: string]: number } = {};
    const lastPrice: { [key: string]: number } = {};
    
    const now = Date.now();
	  const endDate = now + (ONE_DAY - (now % ONE_DAY)); // start of tomorrow
    let earliestTime = endDate;

    if (lastSynced.valueOf() > 0) {
      // Just pick up where we left off since we last sync'ed
      oldTimeslices.forEach(slice => {
        timeslices.set(slice.start, slice);
        earliestTime = slice.start;
      });
    } else {
      // This is the first time ever syncing
      for (const holding of holdings) {
        if (holding.snapshots[0].timestamp < earliestTime) {
          earliestTime = holding.snapshots[0].timestamp;
        }
      }
    }

    const startDate = earliestTime - (earliestTime % ONE_DAY);
    const currentSnapshot: { [key: string]: number } = {};
    
    // Grab historical daily price data for each asset we need
    for (const holding of holdings) {
      currentSnapshot[holding.asset.assetId] = 0;

      const asset = holding.asset.assetId;

      if (!fiat(asset)) {
        const priceData: IHistoricalPrice[] = await getHistoricalValues(asset, startDate, endDate - ONE_DAY);
        const priceByDate: { [key: number]: IHistoricalPrice } = {};
        for (const historicalPrice of priceData) {
          priceByDate[historicalPrice.timestamp] = historicalPrice;
        }
        prices[asset] = priceByDate;
      }

      lastPrice[asset] = fiat(asset);
      lastAmount[asset] = 0;
    }

    for (let day = startDate; day < endDate; day += ONE_DAY) {
      const timeslice: ITimeslice = {
        start: day,
        value: { USD: 0 },
        holdings: new Map<string, IHoldingSlice>()
      };

      for (const holding of holdings) {
        const asset = holding.asset.assetId;
        const snapsInThisSlice: IHoldingSnapshot[] = [];

        for (let i = currentSnapshot[asset]; i < holding.snapshots.length; i++) {
          const snap = holding.snapshots[i];
          const snapDay = snap.timestamp - (snap.timestamp % ONE_DAY);

          if (snapDay < day) {
            lastAmount[asset] = snap.amountHeld;
            lastPrice[asset] = snap.price.USD;
            currentSnapshot[asset]++;
          } else if (snapDay === day) {
            snapsInThisSlice.push(snap);
            lastAmount[asset] = snap.amountHeld;
            lastPrice[asset] = snap.price.USD;
            currentSnapshot[asset]++;
          } else {
            break;
          }
        }

        const historicalPrice = prices[asset] && prices[asset][day];
        if (historicalPrice) {
          lastPrice[asset] = historicalPrice.price;
        }

        const value = lastAmount[asset] * lastPrice[asset];

        const holdingSlice: IHoldingSlice = {
          assetId: asset,
          amount: lastAmount[asset],
          price: { USD: lastPrice[asset] },
          value: {USD: value },
          snapshots: snapsInThisSlice
        };

        timeslice.holdings.set(asset, holdingSlice);
        timeslice.value.USD += value;
      }

      timeslices.set(day, timeslice);
    }

    return timeslices;
  }

  static async createHourlyTimeslices(oldHourlyTimeslices: ITimeslices, dailyTimeslices: ITimeslices, getHourlyData: GetHistoricalValuesHandler): Promise<ITimeslices> {
    
    const hourlySlices: ITimeslices = new Map<number, ITimeslice>();
    const lastAmount: Map<string, number> = new Map<string, number>();
    const lastPrice:  Map<string, number> = new Map<string, number>();
    const timeslices = Array.from(dailyTimeslices.values());
    const prices: Map<string, Map<number, IHistoricalPrice>> = new Map<string, Map<number, IHistoricalPrice>>();
    let cachedHours = 0;
    let daysCached = 0;
    const latestHour = getLatestHour();
    const startOfToday = latestHour - (latestHour % ONE_DAY);
    const oneWeekAgo = latestHour - ONE_WEEK;

    const assets = extractAllAssetsHeldInLastWeekFromTimeslices(timeslices);
    for (let i = 0; i < assets.length; i++)
    { // Grab last week of hourly prices for each symbol in holdings
      const hourlyPrices = await getHourlyData(assets[i], oneWeekAgo-ONE_HOUR, latestHour);
      
      const values = new Map<number, IHistoricalPrice>();
      for (let j = 0; j < hourlyPrices.length; j++)
      {
        values.set(hourlyPrices[j].timestamp, hourlyPrices[j]);
      }
      prices.set(assets[i], values);
    }

    if (timeslices.length < 8) {
      // The exchange account does not have a full week of data
      return hourlySlices;
    }
    if (timeslices[timeslices.length - 1].start < startOfToday) {
      // The exchange account has not been synced
      return hourlySlices;
    }

    let cachedHourlyTimeSlices: ITimeslices;
    if (oldHourlyTimeslices.size > 0) {
      cachedHourlyTimeSlices = new Map<number, ITimeslice>(oldHourlyTimeslices);
      const cachedHourlyTimeSlicesArr = Array.from(cachedHourlyTimeSlices.values());
      const cachedLength = cachedHourlyTimeSlicesArr.length;

      if (cachedHourlyTimeSlicesArr[cachedLength - 1].start >= latestHour - ONE_HOUR)
      {
        return cachedHourlyTimeSlices;
      }

      const lastHourCached = cachedHourlyTimeSlicesArr[cachedLength - 1].start;
      const firstHourNeeded = oneWeekAgo - ONE_HOUR;
      if (lastHourCached >= firstHourNeeded) { // is the cached data within our range of required data?
        // start from the last index and go back however many hours are cached that we require
        const startIndex = (cachedLength) - ((lastHourCached - firstHourNeeded) / ONE_HOUR);

        for (let i = startIndex; i < cachedLength; i++) { // save the relevant cached hourly slices
          hourlySlices.set(cachedHourlyTimeSlicesArr[i].start, cachedHourlyTimeSlicesArr[i]);
          cachedHours++;
        }

        daysCached = ~~(((lastHourCached + ONE_HOUR) - (timeslices[timeslices.length - 8].start)) / ONE_DAY); // integer division to get days cached

        // initialize the holdings amounts and prices from the last hour cached
        for (const holding of hourlySlices.get(lastHourCached)?.holdings.values() || []) {
          lastAmount.set(holding.assetId, holding.amount);
          lastPrice.set(holding.assetId, holding.price.USD);
        }
      }
    } else if (timeslices.length >= 9) {
      // initialize the holdings amounts and prices from 8 days ago
      for (const [key, value] of timeslices[timeslices.length - 9].holdings) {
        lastAmount.set(key, value.amount);
        lastPrice.set(key, value.price.USD);
      }
    }

    for (let i = timeslices.length - 8 + daysCached; i < timeslices.length; i++) {
      const dailySlice = timeslices[i];
      let startOfDay = dailySlice.start;
      const endOfDay = Math.min(startOfDay + ONE_DAY, latestHour);
      const holdings = Array.from(dailySlice.holdings.values());
      const currentSnap: Map<string, number> = new Map<string,number>();
      let firstPass = false;

      // set first day's start to the last cached hour
      if (i == timeslices.length - 8 + daysCached) {
        startOfDay = oneWeekAgo - ONE_HOUR + (cachedHours * ONE_HOUR);
        if (cachedHours > 0) { firstPass = true; }
      }

      // initialize the current snapshot index for each holding to 0 for each daily slice
      holdings.forEach((holding) => {
        currentSnap.set(holding.assetId, 0);
      });

      for (let hour = startOfDay; hour < endOfDay; hour += ONE_HOUR) {
        const hourlySlice: ITimeslice = {
          start: hour,
          value: { USD: 0 },
          holdings: new Map<string, IHoldingSlice>()
        };
        const snapsInThisSlice: IHoldingSnapshot[] = [];

        for (let j=0, holding = holdings[j]; j < holdings.length; holding = holdings[++j]) {
          const currentAsset = holding.assetId;
          for (let index = currentSnap.get(currentAsset) ?? 0; index < holding.snapshots.length; index++) {
            const snap = holding.snapshots[index];
            if (snap.timestamp < hour + ONE_HOUR) {
              snapsInThisSlice.push(snap);
              lastAmount.set(currentAsset, snap.amountHeld);
              lastPrice.set(currentAsset, snap.price.USD);
              currentSnap.set(currentAsset, (currentSnap.get(currentAsset) ?? 0) + 1);
            } else { break; }
          }

          const hourlyPrice = prices.get(currentAsset)?.get(hour);

          if (hourlyPrice != undefined) { lastPrice.set(currentAsset, hourlyPrice.price); }
          if (!lastAmount.has(currentAsset)) { lastAmount.set(currentAsset, 0); }
          const currentLastAmount = lastAmount.get(currentAsset) ?? 0;
          const currentLastPrice = lastPrice.get(currentAsset) ?? 0; 
          const value = currentLastAmount * currentLastPrice;

          const hourlyHoldingSlice: IHoldingSlice = {
            assetId: currentAsset,
            amount: currentLastAmount,
            price: { USD: currentLastPrice },
            value: { USD: value },
            snapshots: snapsInThisSlice
          };

          hourlySlice.holdings.set(currentAsset, hourlyHoldingSlice);
          hourlySlice.value.USD += value;
        }

        if (firstPass) { firstPass = false; }
        else { hourlySlices.set(hour, hourlySlice); }
      }
    }
    
    return hourlySlices;
  }
}

export function fiat(symbol: string) : number
{
  switch (symbol)
  {
    case "usd":
    case "USD":
    case "USD/USD":
    case "uniswap-state-dollar":
      return 1;
    default:
      return 0;
  }
}

export function getLatestHour(): number {
  const now = Date.now();
  const latestHour = now - (now % ONE_HOUR);
  return latestHour;
}

export function extractAllAssetsHeldInLastWeekFromTimeslices(slices: ITimeslice[]): string[] {
  const assets = new Set<string>();

  for (let i = Math.max(slices.length - 8, 0); i < slices.length; i++) {
    const holdings = slices[i].holdings.keys();
    for (const asset of holdings) {
      assets.add(asset);
    }
  }

  return Array.from(assets);
}

export default Timeslices;