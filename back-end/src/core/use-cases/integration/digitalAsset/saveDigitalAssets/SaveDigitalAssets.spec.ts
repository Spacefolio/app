import { SaveDigitalAssetsUseCase } from ".";
import { IDigitalAssetEntityGateway, IDigitalAssetMarketData } from "..";
import { DigitalAssetInMemoryEntityGateway } from "../../../../../data";

describe('Save All Digital Assets Use Case', () => {
  const digitalAssetDatabase: IDigitalAssetEntityGateway = new DigitalAssetInMemoryEntityGateway();
  const saveDigitalAssetsUseCase: SaveDigitalAssetsUseCase = new SaveDigitalAssetsUseCase(digitalAssetDatabase);

  beforeEach(async () => {
    await digitalAssetDatabase.clearDigitalAssets();
  });

  it('Saves all assets successfully', async () => {
    const response = await saveDigitalAssetsUseCase.execute({ digitalAssets: marketData});
    
    expect(response.isError).toBe(false);
    const assets = response.getValue();

    expect(assets.length).toBe(4);
  });
});

const marketData: IDigitalAssetMarketData[] = [{
  "id": "bitcoin",
  "symbol": "btc",
  "name": "Bitcoin",
  "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  "current_price": 57789,
  "market_cap": 1080676967090,
  "market_cap_rank": 1,
  "fully_diluted_valuation": 1213835859061,
  "total_volume": 44830458422,
  "high_24h": 58722,
  "low_24h": 56663,
  "price_change_24h": 715.11,
  "price_change_percentage_24h": 1.25295,
  "market_cap_change_24h": 16665551597,
  "market_cap_change_percentage_24h": 1.56629,
  "circulating_supply": 18696281,
  "total_supply": 21000000,
  "max_supply": 21000000,
  "ath": 64805,
  "ath_change_percentage": -10.80633,
  "ath_date": "2021-04-14T11:54:46.763Z",
  "atl": 67.81,
  "atl_change_percentage": 85141.94071,
  "atl_date": "2013-07-06T00:00:00.000Z",
  "roi": null,
  "last_updated": "2021-05-01T20:02:03.016Z"
},
{
  "id": "ethereum",
  "symbol": "eth",
  "name": "Ethereum",
  "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
  "current_price": 2926.59,
  "market_cap": 338467622152,
  "market_cap_rank": 2,
  "fully_diluted_valuation": null,
  "total_volume": 36685398943,
  "high_24h": 2943.8,
  "low_24h": 2744.64,
  "price_change_24h": 141.38,
  "price_change_percentage_24h": 5.07623,
  "market_cap_change_24h": 16779242359,
  "market_cap_change_percentage_24h": 5.21599,
  "circulating_supply": 115698935.749,
  "total_supply": null,
  "max_supply": null,
  "ath": 2943.8,
  "ath_change_percentage": -0.62441,
  "ath_date": "2021-05-01T18:59:56.331Z",
  "atl": 0.432979,
  "atl_change_percentage": 675549.30652,
  "atl_date": "2015-10-20T00:00:00.000Z",
  "roi": {
    "times": 66.67455838993448,
    "currency": "btc",
    "percentage": 6667.455838993447
  },
  "last_updated": "2021-05-01T20:01:54.601Z"
},
{
  "id": "binancecoin",
  "symbol": "bnb",
  "name": "Binance Coin",
  "image": "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
  "current_price": 622.18,
  "market_cap": 96151468284,
  "market_cap_rank": 3,
  "fully_diluted_valuation": 106106733520,
  "total_volume": 5465698084,
  "high_24h": 638.27,
  "low_24h": 612.9,
  "price_change_24h": -2.59521063,
  "price_change_percentage_24h": -0.41538,
  "market_cap_change_24h": -582847735.3049622,
  "market_cap_change_percentage_24h": -0.60252,
  "circulating_supply": 154533651.9,
  "total_supply": 170533651.9,
  "max_supply": 170533651.9,
  "ath": 638.27,
  "ath_change_percentage": -2.51761,
  "ath_date": "2021-05-01T03:38:33.970Z",
  "atl": 0.0398177,
  "atl_change_percentage": 1562531.9983,
  "atl_date": "2017-10-19T00:00:00.000Z",
  "roi": null,
  "last_updated": "2021-05-01T20:00:47.586Z"
},
{
  "id": "ripple",
  "symbol": "xrp",
  "name": "XRP",
  "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
  "current_price": 1.58,
  "market_cap": 72873323945,
  "market_cap_rank": 4,
  "fully_diluted_valuation": null,
  "total_volume": 6832222914,
  "high_24h": 1.61,
  "low_24h": 1.54,
  "price_change_24h": -0.00212852,
  "price_change_percentage_24h": -0.13426,
  "market_cap_change_24h": 95386692,
  "market_cap_change_percentage_24h": 0.13107,
  "circulating_supply": 46020451007,
  "total_supply": 100000000000,
  "max_supply": null,
  "ath": 3.4,
  "ath_change_percentage": -53.40527,
  "ath_date": "2018-01-07T00:00:00.000Z",
  "atl": 0.00268621,
  "atl_change_percentage": 58849.2504,
  "atl_date": "2014-05-22T00:00:00.000Z",
  "roi": null,
  "last_updated": "2021-05-01T20:00:53.831Z"
}];