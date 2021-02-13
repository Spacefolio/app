import { IExchangeAccount } from './exchange.types';

export interface IUser {
    id: string;
    username: string;
    hash: string;
    firstName: string;
    lastName: string;
    linkedExchanges: IExchangeAccount[];
}

export interface ILoginRequest {
    username: string;
    password: string;
}

export interface IRegisterRequest {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}