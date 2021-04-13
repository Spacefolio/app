import { RegisterUserUseCase, AuthenticateUserUseCase } from "../../core/use-cases/user";
import { RegisterUserController, AuthenticateUserController } from "../../entrypoint/web/controllers";

class ControllersConfiguration {
  static getAuthenticateUserController(authenticateUserUseCase: AuthenticateUserUseCase) : AuthenticateUserController {
    return new AuthenticateUserController(authenticateUserUseCase);
  }

  static getRegisterUserController(registerUserUseCase: RegisterUserUseCase) : RegisterUserController {
    return new RegisterUserController(registerUserUseCase);
  }
}

export default ControllersConfiguration;