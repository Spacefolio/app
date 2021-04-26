import { BaseExchange } from "../../../core/entities";
import { Coinbase } from "./Implementations/Coinbase";

export enum Exchange {
  BINANCE = "binance",
  BINANCEUS = "binanceus",
  COINBASE = "coinbase",
  COINBASEPRO = "coinbasepro",
  HITBTC = "hitbtc",
  KUCOIN = "kucoin"
}

export const ExchangeName = new Map<Exchange, string>([
  [Exchange.BINANCE, "Binance"],
  [Exchange.BINANCEUS, "BinanceUS"],
  [Exchange.COINBASE, "Coinbase"],
  [Exchange.COINBASEPRO, "CoinbasePro"],
  [Exchange.HITBTC, "HitBTC"],
  [Exchange.KUCOIN, "KuCoin"]
]);

class ExchangesConfiguration {
  static exchanges: Map<Exchange, BaseExchange> = new Map<Exchange, BaseExchange>([
    [Exchange.COINBASE, new Coinbase()] 
  ]);

  static get(exchange: Exchange): BaseExchange {
    return <BaseExchange>this.exchanges.get(exchange);
  }
}

export default ExchangesConfiguration;