import { IUserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser, ExchangeAccount } from '../../core/entities';

class UserInMemoryEntityGateway implements IUserEntityGateway {
  users: User[];

  constructor() {
    this.users = [];
  }

  async exists(email: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.email === email);
    return index != -1;
  }

  async usernameIsTaken(username: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.username === username);
    return index != -1;
  }

  async getUser(email: string): Promise<User | undefined> {
    const result = this.users.find(user => user.email === email);
    return result;
  }

  async updateUser(user: IUser): Promise<User | undefined> {
    const index = this.users.findIndex((u: User) => u.email === user.email);
    this.users[index] = makeUser(user);
    return this.users[index];
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const user: User = makeUser(payload);
    this.users.push(user);

    return user;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async clearUsers(): Promise<void> {
    this.users = [];
  }

  async addExchangeAccountForUser(email: string, exchangeAccount: ExchangeAccount): Promise<void> {
    const user = await this.getUser(email);
    if (!user) return;
    user.exchangeAccounts.push(exchangeAccount);
  }

  async removeExchangeAccountForUser(email: string, accountId: string): Promise<void> {
    const user = await this.getUser(email);
    if (!user) return;
    const indexToRemove = user.exchangeAccounts.findIndex((account) => account.accountId == accountId);
    user.exchangeAccounts.splice(indexToRemove, 1);
  }

  async userHasExchangeAccount(email: string, accountId: string): Promise<boolean> {
    const user = await this.getUser(email);
    if (!user) return false;
    return user.exchangeAccounts.some((account) => account.accountId === accountId);
  }
}

export default UserInMemoryEntityGateway;