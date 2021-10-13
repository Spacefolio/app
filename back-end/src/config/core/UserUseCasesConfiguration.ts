import argon2 from "argon2";
import { AuthenticateUserUseCase, RegisterUserUseCase, IUserEntityGateway, CheckRegistrationUseCase } from "../../core/use-cases/user";

class UserUseCasesConfiguration {
  static getAuthenticateUserUseCase(userEntityGateway: IUserEntityGateway): AuthenticateUserUseCase {
    const verifyHash = async (hash: string, pass: string) => {
      return await argon2.verify(hash, pass);
    }
    return new AuthenticateUserUseCase(userEntityGateway, verifyHash);
  }

  static getRegisterUserUseCase(userEntityGateway: IUserEntityGateway): RegisterUserUseCase {
    return new RegisterUserUseCase(userEntityGateway);
  }

  static getCheckRegistrationUseCase(userEntityGateway: IUserEntityGateway): CheckRegistrationUseCase {
    return new CheckRegistrationUseCase(userEntityGateway);
  }
}

export default UserUseCasesConfiguration;