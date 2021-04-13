import { LeanDocument } from "mongoose";
import { makeUser, User } from "../../core/entities";
import { IUserDocument, IUserDao } from "./UserModel";

class UserMapper {
  public static toDomain(raw: LeanDocument<IUserDocument>): Readonly<User> {
    const user = makeUser({
      email: raw.email,
      username: raw.username,
      password: raw.password,
      firstName: raw.firstName,
      lastName: raw.lastName,
    });

    return user;
  }

  public static fromDomain(user: Readonly<User>): IUserDao {
    const userDao: IUserDao = {
      email: user.getEmail(),
      username: user.getUsername(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    }

    return userDao;
  }
}

export default UserMapper;