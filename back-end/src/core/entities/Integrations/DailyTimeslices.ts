import { IExchangeAccount, ITimeslices } from ".";
import { IHistoricalPrice } from "./Asset";
import { GetHistoricalValuesHandler, GetRateHandler } from "./Exchanges/ExchangeAccount";
import { IHoldingSnapshot } from "./HoldingSnapshot";
import { IHoldingSlice, ITimeslice, ONE_DAY } from "./Timeslice";

class DailyTimeslices {
  private account: IExchangeAccount;
  private getRate: GetRateHandler;
  private getHistoricalValues: GetHistoricalValuesHandler;
  private timeslices: ITimeslices;

  constructor (account: IExchangeAccount, getRate: GetRateHandler, getHistoricalValues: GetHistoricalValuesHandler) {
    this.account = account;
    this.getRate = getRate;
    this.getHistoricalValues = getHistoricalValues;
    this.timeslices = {};
  }

  async createTimeslices(): Promise<ITimeslices> {
    const oldTimeslices = this.account.dailyTimeslices;
    const timeslices = this.timeslices;
    const prices: { [key: string]: IHistoricalPrice[] } = {};
    const lastAmount: { [key: string]: number } = {};
    const lastPrice: { [key: string]: number } = {};
    
    const now = Date.now();
	  const endDate = now + (ONE_DAY - (now % ONE_DAY)); // start of tomorrow
    let earliestTime = endDate;

    if (this.account.lastSynced.valueOf() > 0) {
      // Just pick up where we left off since we last sync'ed
      Object.keys(oldTimeslices).forEach(timestamp => {
        timeslices[Number(timestamp)] = oldTimeslices[Number(timestamp)];
        earliestTime = timeslices[Number(timestamp)].start;
      });
    } else {
      // This is the first time ever syncing
      for (const holding of this.account.holdings) {
        if (holding.snapshots[0].timestamp < earliestTime) {
          earliestTime = holding.snapshots[0].timestamp;
        }
      }
    }

    const startDate = earliestTime - (earliestTime % ONE_DAY);

    const currentSnapshot: { [key: string]: number } = {};
    
    // Grab historical daily price data for each asset we need
    for (const holding of this.account.holdings) {
      currentSnapshot[holding.asset.assetId] = 0;

      const asset = holding.asset.assetId;
      prices[asset] = await this.getHistoricalValues(asset, startDate, endDate - ONE_DAY);
      lastPrice[asset] = fiat(asset);
      lastAmount[asset] = 0;
    }

    for (let day = startDate; day < endDate; day += ONE_DAY) {
      const timeslice: ITimeslice = {
        start: day,
        value: { USD: 0 },
        holdings: {}
      };

      for (const holding of this.account.holdings) {
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

        const historicalPrice = prices[asset][day];
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

        timeslice.holdings[asset] = holdingSlice;
        timeslice.value.USD += value;
      }

      timeslices[day] = timeslice;
    }

    this.account.dailyTimeslices = this.timeslices;
    return this.timeslices;
  }
}

export function fiat(symbol: string) : number
{
  switch (symbol)
  {
    case "usd":
    case "USD":
    case "USD/USD":
      return 1;
    default:
      return 0;
  }
}

export default DailyTimeslices;