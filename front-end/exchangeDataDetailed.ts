import { IPortfolioData } from "../types";

export const mockPortfolioCalculations: IPortfolioData[] = [
  {
    name: "Coinbase",
    id: "AxwSp4JXTHSekhKT",
    nickname: "Coinbase",
    addedDate: "2021-02-06T14:42:23.110Z",
    apiInfo: {
      passphrase: "i318j5931n9",
      apiSecret:
        "7Irfgjkhqasdflajnsd;flkajsd;lfkjqa;slkdfj;alskdjf;laskdjf;alskdfjz;lkj",
      apiKey: "2cdb30cb750552e6ca7afaaf2b9bf414",
    },
    exchangeType: "coinbase",
    portfolioItems: [
      {
        id: "IQIAGlLxeF1612115491316",
        asset: {
          id: "FiatCoinUSD",
          name: "USD",
          symbol: "USD",
          logoUrl: "https://static.coinstats.app/flags/USD_r.png",
        },
        currentPrice: 1,
        profitTotal: {
          all: { USD: 0, BTC: 0, ETH: 0 },
          h24: { USD: 0, BTC: 2.480016397, ETH: 2.092904543 },
          lt: { USD: 0, BTC: 0, ETH: 0 },
        },
        balance: 0.00944004,
        profitTotals: {
          all: 0,
          h24: 0,
          lt: 0,
        },
      },
      {
        id: "IQIAGlLxeF1612115491316",
        asset: {
          id: "FiatCoinUSD",
          name: "USD",
          symbol: "USD",
          logoUrl: "https://static.coinstats.app/flags/USD_r.png",
          ift: true,
        },
        currentPrice: 1,
        profitTotal: {
          all: 0,
          h24: 0,
          lastTrade: 0,
        },
        balance: 0.00944004,
        profitPercentage: {
          all: 0,
          h24: 0,
          lastTrade: 0,
        },
      },
    ],
    profitPercentage: -100.00101972930557,
    portfolioTotal: 0.009840201,
    profitTotal: 964.991508239,
  },
];
