import { ExchangeAccount } from "./Integration";

export interface IUser {
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  exchangeAccounts?: ExchangeAccount[];
}

export class User implements IUser {
  public readonly email: string;
  public readonly username: string;
  public readonly password: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly exchangeAccounts: ExchangeAccount[];

  protected constructor(user : IUser) {
    this.email = user.email;
    this.username = user.username || '';
    this.password = user.password;
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.exchangeAccounts = user.exchangeAccounts || [];
  }

  static buildMakeUser() {
    return function makeUser(userParams: IUser): User
    {
      return new User(userParams);
    }
  }
}

export default User.buildMakeUser;