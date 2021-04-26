import { UserEntityGateway, CreateUserPayload } from '../../core/use-cases/user';
import { User, IUser, makeUser } from '../../core/entities';
import UserModel from './UserModel';
import UserMapper from './UserMapper';

const Users = UserModel;

class UserMongooseEntityGateway implements UserEntityGateway {
  
  async exists (email: string): Promise<boolean> {
    const exists = await Users.exists({ email });
    return exists;
  }

  async getUser(email: string): Promise<User | undefined> {
    const user = await Users.findOne({ email }).populate('exchangeAccounts');
    if (user) {
      return UserMapper.toDomain(user);
    }
    return undefined;
  }

  async updateUser(user: IUser): Promise<User | undefined> {
    const userToUpdate = await Users.findOne({ email: user.email });

    if (!userToUpdate) {
      return undefined;
    }

    const userEntity = makeUser(user);
    const userDao = UserMapper.fromDomain(userEntity);
    Object.assign(userToUpdate, userDao);

    userToUpdate.save((err) => {
      if (err) {
        return undefined;
      }
    });

    return userEntity;
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const newUser = await Users.create(payload);
    const userEntity = UserMapper.toDomain(newUser);
    return userEntity;
  }

  async getUsers(): Promise<User[]> {
    const users = await Users.find().lean();
    return users.map((user) => UserMapper.toDomain(user));
  }

  async clearUsers() : Promise<void> {
    await Users.remove({});
  }
}

export default UserMongooseEntityGateway;