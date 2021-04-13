import { IUseCase, Result } from "../../../definitions";
import { User } from "../../../entities";
import IUserEntityGateway from "../UserEntityGateway";
import { AuthenticateUserRequestDto, AuthenticateUserResponseDto } from ".";
import { AuthenticateUserInvalidRequest, InvalidCredentials, UserNotFound } from "./errors";

export type VerifyHash = (hash: string, pass: string) => Promise<boolean>

class AuthenticateUserUseCase implements IUseCase<AuthenticateUserRequestDto, AuthenticateUserResponseDto> {
  
  private userEntityGateway: IUserEntityGateway;
  private verifyHash;

  constructor(userEntityGateway: IUserEntityGateway, verifyHash: VerifyHash) {
    this.userEntityGateway = userEntityGateway;
    this.verifyHash = verifyHash;
  }
  
  async execute(request: AuthenticateUserRequestDto): Promise<AuthenticateUserResponseDto> {
    if (!request || !request.email || !request.password) {
      return Result.fail(new AuthenticateUserInvalidRequest(request));
    }

    const user: Readonly<User> | undefined = await this.userEntityGateway.getUser(request.email);

    if (!user) {
      return Result.fail(new UserNotFound(request.email));
    }

    const passwordHash = user.getPassword();
    if (await this.verifyHash(passwordHash, request.password)) {
      return Result.ok<Readonly<User>>(user);
    } else {
      return Result.fail(new InvalidCredentials());
    }
  }
}

export default AuthenticateUserUseCase;