import { LeanDocument } from "mongoose";
import { makeUser, User } from "../../core/entities";
import { ExchangeAccount } from "../../core/entities/Integration";
import ExchangeAccountMapper from "../integration/exchangeAccount/ExchangeAccountMapper";
import { IExchangeAccountDao } from "../integration/exchangeAccount/ExchangeAccountModel";
import { IUserDocument, IUserDao } from "./UserModel";

class UserMapper {
  public static toDomain(raw: LeanDocument<IUserDocument>): User {

    let exchangeAccounts: ExchangeAccount[] = [];
    if (raw.exchangeAccounts && raw.exchangeAccounts.length > 0 && ExchangeAccountMapper.isExchangeAccountDao(raw.exchangeAccounts[0]))
    {
      const exchangeAccountDaos = <unknown>raw.exchangeAccounts as IExchangeAccountDao[];
      exchangeAccounts = exchangeAccountDaos.map((exchangeAccountDao: IExchangeAccountDao) => {
        return ExchangeAccountMapper.toDomain(exchangeAccountDao);
      });
    }

    const user = makeUser({
      email: raw.email,
      username: raw.username,
      password: raw.password,
      firstName: raw.firstName,
      lastName: raw.lastName,
      exchangeAccounts
    });

    return user;
  }

  public static fromDomain(user: User): IUserDao {
    const userDao: IUserDao = {
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    }

    return userDao;
  }

}

export default UserMapper;