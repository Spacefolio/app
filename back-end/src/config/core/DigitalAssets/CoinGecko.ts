import axios from "axios";
import { IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";

class CoinGecko {
  public static async fetchDigitalAssets(): Promise<IDigitalAssetMarketData[]> {
    let digitalAssets: IDigitalAssetMarketData[] = [];

    digitalAssets = await this.fetchAllCoinsMarketDataCursor();
    return digitalAssets;
  }

  private static async fetchAllCoinsMarketDataCursor(page = 1) : Promise<IDigitalAssetMarketData[]> {
    const results = await this.fetchCoinMarketDataPage(page);
    if (results.length > 0)
    {
      return results.concat(await this.fetchAllCoinsMarketDataCursor(page + 1));
    }
    else
    {
      return results;
    }
  }

  private static async fetchCoinMarketDataPage(page = 1): Promise<IDigitalAssetMarketData[]> {
    const results = await axios.get<IDigitalAssetMarketData[]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true`).then((res) => {
      return res.data;
    }).catch((err) => { throw err; });

    return results;
  }
}

export default CoinGecko;