export interface IMetaportfolioChart {
  
}

export interface IExchangeExtraData {
  name: string;
  id: string;
  nickname: string;
  exchangeType: exchangeType;
  addedDate: Date;
  logoUrl?: string;
  apiInfo: {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
  };
  portfolioItems: ([IPortfolioItem]);
}
