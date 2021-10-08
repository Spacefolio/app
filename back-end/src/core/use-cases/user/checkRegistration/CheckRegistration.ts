import { IUseCase, Result } from "../../../definitions";
import IUserEntityGateway from "../UserEntityGateway";
import { CheckRegistrationInvalidRequest } from "./errors";
import { CheckRegistrationRequest, CheckRegistrationResponse } from ".";

class CheckRegistrationUseCase implements IUseCase<CheckRegistrationRequest, CheckRegistrationResponse> {
  
  private userEntityGateway: IUserEntityGateway;

  constructor(userEntityGateway: IUserEntityGateway) {
    this.userEntityGateway = userEntityGateway;
  }
  
  async execute(request: CheckRegistrationRequest): Promise<CheckRegistrationResponse> {
    if (!request || !request.email) {
      return Result.fail(new CheckRegistrationInvalidRequest(request));
    }
    
    const registered: boolean = await this.userEntityGateway.exists(request.email);
    return Result.ok<boolean>(registered);
  }
}

export default CheckRegistrationUseCase;