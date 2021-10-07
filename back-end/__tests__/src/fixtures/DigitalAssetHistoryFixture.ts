import faker from 'faker';
import { IDigitalAssetHistory, IHistoricalPrice } from '../../../src/core/entities/Integrations/Asset';
import { ONE_DAY } from '../../../src/core/entities/Integrations/Timeslice';
import { IDigitalAssetMarketData } from '../../../src/core/use-cases/integration/digitalAsset';

export function makeFakeDigitalAssetHistory (overrides: Partial<IDigitalAssetHistory> = {}): IDigitalAssetHistory {
  const ONE_HOUR = 3600 * 1000;
  const historicalPrices: IHistoricalPrice[] = [];
  const dailyPrices: IHistoricalPrice[] = [];
  const startTimestamp = faker.date.recent();
  let today = Date.now();
  today = today - (today % ONE_DAY);
  
  for (let i = 0; i < 8*24; i++) {
    historicalPrices[i] = {
      timestamp: startTimestamp.valueOf() + (i * ONE_HOUR),
      price: faker.datatype.number()
    };
    dailyPrices[i] = {
      timestamp: today - (8*24*ONE_DAY) + (i * ONE_DAY),
      price: faker.datatype.number()
    };
  }

  const digitalAssetHistoryParams: IDigitalAssetHistory = {
    assetId: faker.random.alphaNumeric(7),
    prices: dailyPrices,
    hourlyPrices: historicalPrices
  };

  return { ...digitalAssetHistoryParams, ...overrides };
}

export function makeFakeDigitalAssetMarketData (overrides: Partial<IDigitalAssetMarketData> = {}): IDigitalAssetMarketData {
  const digitalAssetMarketDataParams: IDigitalAssetMarketData = {
    id: faker.random.alphaNumeric(7),
    symbol: faker.random.alpha({count: 3, upcase: false}),
    name: faker.random.word(),
    image: faker.random.image(),
    current_price: faker.datatype.float(),
    market_cap: faker.datatype.number(),
    market_cap_rank: faker.datatype.number(),
    fully_diluted_valuation: faker.datatype.number(),
    total_volume: faker.datatype.number(),
    high_24h: faker.datatype.number(),
    low_24h: faker.datatype.number(),
    price_change_24h: faker.datatype.number(),
    price_change_percentage_24h: faker.datatype.number(),
    market_cap_change_24h: faker.datatype.number(),
    market_cap_change_percentage_24h: faker.datatype.number(),
    circulating_supply: faker.datatype.number(),
    total_supply: faker.datatype.number(),
    max_supply: faker.datatype.number(),
    ath: faker.datatype.number(),
    ath_change_percentage: faker.datatype.number(),
    ath_date: faker.datatype.datetime().toTimeString(),
    atl: faker.datatype.number(),
    atl_change_percentage: faker.datatype.number(),
    atl_date: faker.datatype.datetime().toTimeString(),
    last_updated: faker.datatype.datetime().toTimeString(),
    sparkline_in_7d: {
      price: faker.datatype.array(7*24) as number[]
    }
  };

  return { ...digitalAssetMarketDataParams, ...overrides };
}