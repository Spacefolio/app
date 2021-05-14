import { IUseCase, Result } from "../../../definitions";
import { User } from "../../../entities";
import IUserEntityGateway from "../UserEntityGateway";
import { AuthenticateUserRequest, AuthenticateUserResponse } from ".";
import { AuthenticateUserInvalidRequest, InvalidCredentials, UserNotFound } from "./errors";

export type VerifyHashHandler = (hash: string, pass: string) => Promise<boolean>

class AuthenticateUserUseCase implements IUseCase<AuthenticateUserRequest, AuthenticateUserResponse> {
  
  private userEntityGateway: IUserEntityGateway;
  private verifyHash;

  constructor(userEntityGateway: IUserEntityGateway, verifyHash: VerifyHashHandler) {
    this.userEntityGateway = userEntityGateway;
    this.verifyHash = verifyHash;
  }
  
  async execute(request: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    if (!request || !request.email || !request.password) {
      return Result.fail(new AuthenticateUserInvalidRequest(request));
    }

    const user: User | undefined = await this.userEntityGateway.getUser(request.email);

    if (!user) {
      return Result.fail(new UserNotFound(request.email));
    }

    const passwordHash = user.password;
    if (await this.verifyHash(passwordHash, request.password)) {
      return Result.ok<User>(user);
    } else {
      return Result.fail(new InvalidCredentials());
    }
  }
}

export default AuthenticateUserUseCase;