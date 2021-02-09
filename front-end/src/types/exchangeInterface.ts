export interface IExchangeAccount {
  addedDate?: string;
  id: string;
  exchangeType: string;
  nickname: string;
  name: string;
  logoUrl: string;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}
export interface IExchangeAccountRequest {
  exchangeType: string;
  nickname: string;
  name: string;
  apiKey: string;
  apiSecret: string;
  passphrase: string;
}
export interface IExchangeReference {
  id: string;
  name: string;
  logoUrl: string;
}