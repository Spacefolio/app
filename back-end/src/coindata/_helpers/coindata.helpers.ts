import { coindataService } from "..";

export async function getCoinLogo(symbol: string) {
  symbol = symbol.toLowerCase();
  let coin = await coindataService.getCoinMarketData(symbol);

  if (coin) {
    return coin.image;
  } else {
    return `https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`;
  }
}
