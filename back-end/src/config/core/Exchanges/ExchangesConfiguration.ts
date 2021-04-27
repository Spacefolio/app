import { BaseExchange, Exchange } from "../../../core/entities";
import { Coinbase } from "./Implementations/Coinbase";



class ExchangesConfiguration {
  static exchanges: Map<Exchange, BaseExchange> = new Map<Exchange, BaseExchange>([
    [Exchange.COINBASE, new Coinbase()] 
  ]);

  static get(exchange: Exchange): BaseExchange {
    return <BaseExchange>this.exchanges.get(exchange);
  }
}

export default ExchangesConfiguration;