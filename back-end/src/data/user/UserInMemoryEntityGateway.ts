import { UserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser } from '../../core/entities';

class UserInMemoryEntityGateway implements UserEntityGateway {
  users: Readonly<User>[];
  count: number;

  constructor() {
    this.users = [];
    this.count = 0;
  }

  async exists (email: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.getEmail() === email);
    return index != -1;
  }

  async getUser(email: string): Promise<Readonly<User> | undefined> {
    console.log(`getUser: ${email}`);
    const result = this.users.find(user => user.getEmail() === email);
    return result;
  }

  async updateUser(user: IUser): Promise<Readonly<User> | undefined> {
    const index = this.users.findIndex((u: Readonly<User>) => u.getEmail() === user.email);
    this.users[index] = makeUser(user);
    return this.users[index];
  }

  async createUser(payload: CreateUserPayload): Promise<Readonly<User>> {
    console.log(`createUser: ${JSON.stringify(payload)}`);
    const user: Readonly<User> = makeUser(payload);
    this.users.push(user);

    return user;
  }

  async getUsers(): Promise<Readonly<User>[]> {
    return this.users;
  }

  async clearUsers(): Promise<void> {
    this.users = [];
  }
}

export default UserInMemoryEntityGateway;