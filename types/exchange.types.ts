export interface IExchangeAccount {
    id: string;
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname: string;
    exchangeType: string;
    addedDate: Date;
}

export interface IExchangeAccountRequest {
    apiKey: string;
    apiSecret: string;
    passphrase: string;
    name: string;
    nickname?: string;
    exchangeType: exchangeType;
}

export type exchangeType = ('coinbasepro'|'binance'|'kucoin'|'binanceus'|'hitbtc'|'coinbase');