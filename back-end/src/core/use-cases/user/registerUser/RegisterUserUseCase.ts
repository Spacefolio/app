import { IUseCase, Result } from "../../../definitions";
import { User } from "../../../entities";
import IUserEntityGateway from "../UserEntityGateway";
import { RegisterUserInvalidRequest, UserAlreadyExists } from "./errors";
import { RegisterUserRequestDto, RegisterUserResponseDto } from ".";

class RegisterUserUseCase implements IUseCase<RegisterUserRequestDto, RegisterUserResponseDto> {
  
  private userEntityGateway: IUserEntityGateway;

  constructor(userEntityGateway: IUserEntityGateway) {
    this.userEntityGateway = userEntityGateway;
  }
  
  async execute(request: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
    if (!request || !request.email || !request.username || !request.password) {
      return Result.fail(new RegisterUserInvalidRequest(request));
    }
    
    if (await this.userEntityGateway.exists(request.email)) {
      return Result.fail(new UserAlreadyExists(request.email));
    }

    const user = await this.userEntityGateway.createUser(request);

    return Result.ok<Readonly<User>>(user);
  }
}

export default RegisterUserUseCase;