import { IUseCase, Result } from "../../../definitions";
import { User } from "../../../entities";
import IUserEntityGateway from "../UserEntityGateway";
import { RegisterUserInvalidRequest, UserAlreadyExists } from "./errors";
import { RegisterUserRequest, RegisterUserResponse } from ".";

class RegisterUserUseCase implements IUseCase<RegisterUserRequest, RegisterUserResponse> {
  
  private userEntityGateway: IUserEntityGateway;

  constructor(userEntityGateway: IUserEntityGateway) {
    this.userEntityGateway = userEntityGateway;
  }
  
  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    if (!request || !request.email || !request.password) {
      return Result.fail(new RegisterUserInvalidRequest(request));
    }
    
    if (await this.userEntityGateway.exists(request.email)) {
      return Result.fail(new UserAlreadyExists('email', request.email));
    }

    if (request.username && await this.userEntityGateway.usernameIsTaken(request.username)) {
      return Result.fail(new UserAlreadyExists('username', request.username));
    }

    const user = await this.userEntityGateway.createUser(request);

    return Result.ok<User>(user);
  }
}

export default RegisterUserUseCase;