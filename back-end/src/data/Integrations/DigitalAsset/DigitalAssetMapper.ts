import { IDigitalAsset } from "../../../core/entities/Integrations/Asset";
import { IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";

class DigitalAssetMapper {
  /*
  public static toDomain(raw: LeanDocument<IExchangeAccountDocument>): ExchangeAccount {

    const exchangeAccount = makeExchangeAccount({
      accountId: raw.accountId,
      exchange: ExchangesConfiguration.get(raw.exchange),
      credentials: raw.credentials,
      nickname: raw.nickname
    });

    return exchangeAccount;
  }

  public static fromDomain(exchangeAccount: ExchangeAccount): IExchangeAccountDao {
    const exchangeAccountDao: IExchangeAccountDao = {
      accountId: exchangeAccount.accountId,
      exchange: <Exchange>(exchangeAccount.exchange.id),
      nickname: exchangeAccount.nickname,
      credentials: exchangeAccount.credentials
    }

    return exchangeAccountDao;
  }
  */

  public static fromMarketData(data: IDigitalAssetMarketData): IDigitalAsset {
    const digitalAsset: IDigitalAsset = {
      assetId: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image,
      currentPrice: data.current_price,
      marketCap: data.market_cap,
      marketCapRank: data.market_cap_rank,
      fullyDilutedValuation: data.fully_diluted_valuation || 0,
      totalVolume: data.total_volume,
      high24Hour: data.high_24h,
      low24Hour: data.low_24h,
      priceChange24Hour: data.price_change_24h,
      priceChangePercentage: data.price_change_percentage_24h || 0,
      marketCapChange24Hour: data.market_cap_change_24h,
      marketCapChangePercentage: data.market_cap_change_percentage_24h,
      circulatingSupply: data.circulating_supply,
      totalSupply: data.total_supply || 0,
      maxSupply: data.max_supply || 0,
      ath: data.ath,
      athChangePercentage: data.ath_change_percentage,
      athDate: data.ath_date,
      atl: data.atl,
      atlChangePercentage: data.atl_change_percentage,
      atlDate: data.atl_date,
      lastUpdated: data.last_updated,
      sparkline7day: data.sparkline_in_7d
    }

    return digitalAsset;
  }
}

export default DigitalAssetMapper;
