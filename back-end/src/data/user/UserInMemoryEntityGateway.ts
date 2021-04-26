import { UserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser } from '../../core/entities';

class UserInMemoryEntityGateway implements UserEntityGateway {
  users: User[];
  count: number;

  constructor() {
    this.users = [];
    this.count = 0;
  }

  async exists (email: string): Promise<boolean> {
    const index = this.users.findIndex(user => user.email === email);
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
}

export default UserInMemoryEntityGateway;