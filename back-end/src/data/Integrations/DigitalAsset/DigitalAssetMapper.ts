import { LeanDocument } from "mongoose";
import { IDigitalAsset } from "../../../core/entities/Integrations/Asset";
import { IDigitalAssetMarketData } from "../../../core/use-cases/integration/digitalAsset";
import { IDigitalAssetDocument } from "./DigitalAssetModel";

class DigitalAssetMapper {
  public static toDomain(raw: LeanDocument<IDigitalAssetDocument>): IDigitalAsset {

    const digitalAsset = {
      assetId: raw.assetId,
      symbol: raw.symbol,
      name: raw.name,
      image: raw.image,
      currentPrice: raw.currentPrice,
      marketCap: raw.marketCap,
      marketCapRank: raw.marketCapRank,
      fullyDilutedValuation: raw.fullyDilutedValuation || 0,
      totalVolume: raw.totalVolume,
      high24Hour: raw.high24Hour,
      low24Hour: raw.low24Hour,
      priceChange24Hour: raw.priceChange24Hour,
      priceChangePercentage: raw.priceChangePercentage || 0,
      marketCapChange24Hour: raw.marketCapChange24Hour,
      marketCapChangePercentage: raw.marketCapChangePercentage,
      circulatingSupply: raw.circulatingSupply,
      totalSupply: raw.totalSupply || 0,
      maxSupply: raw.maxSupply || 0,
      ath: raw.ath,
      athChangePercentage: raw.athChangePercentage,
      athDate: raw.athDate,
      atl: raw.atl,
      atlChangePercentage: raw.atlChangePercentage,
      atlDate: raw.atlDate,
      lastUpdated: raw.lastUpdated,
      sparkline7day: raw.sparkline7day
    };

    return digitalAsset;
  }

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
      sparkline7day: { price: data.sparkline_in_7d?.price || [] }
    }

    return digitalAsset;
  }
}

export default DigitalAssetMapper;
