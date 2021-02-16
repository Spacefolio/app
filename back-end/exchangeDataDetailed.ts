import { IPortfolioItem } from "./src/portfolios/portfolio.model";
import { IPortfolioData } from "../types";

const randNum = (min: number = 0, max: number = 500) => {
  var result = Math.random() > 0.5
    ? -1 * (Math.random() * (max - min)) + min
    : 1 * (Math.random() * (max - min)) + min;
    return result.toFixed(2);
};

export const mockPortfolioCalculations = (portfolioItems:IPortfolioItem[]) => {
  return [
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
          asset: portfolioItems[1].asset,
          currentPrice: 1,
          profitPercentage: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
          balance: portfolioItems[1].balance.total,
          profitTotal: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
        },
        {
          id: "IQIAGlLxeF1612115491316",
          asset: portfolioItems[0].asset,
          currentPrice: 481524,
          profitTotal: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
          balance: portfolioItems[0].balance.total,
          profitPercentage: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
        },
      ],
      profitPercentage: randNum(),
      portfolioTotal: randNum(),
      profitTotal: randNum(),
    },
  ];
};

export const mockPortfolioCalculationsFake = () => {
  return [
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
            assetId: 'asdf',
            name: 'BTC',
            logoUrl: '',
            symbol: 'BTC'
          },
          currentPrice: 1,
          profitPercentage: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
          balance: randNum(),
          profitTotal: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
        },
        {
          id: "IQIAGlLxeF1612115491316",
          asset: {
            assetId: 'hjkl',
            name: 'USD',
            logoUrl: '',
            symbol: 'USD'
          },
          currentPrice: 481524,
          profitTotal: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
          balance: randNum(),
          profitPercentage: {
            all: randNum(),
            h24: randNum(),
            lastTrade: randNum(),
          },
        },
      ],
      profitPercentage: randNum(),
      portfolioTotal: randNum(),
      profitTotal: randNum(),
    },
  ];
};
