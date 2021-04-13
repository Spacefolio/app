import { AuthenticateUserController, RegisterUserController } from "../../entrypoint/web/controllers";
import UserRouter from "../../entrypoint/web/routers/UserRouter";

class RouterConfiguration {
  
  static getUserRouter(authenticateUserController: AuthenticateUserController, registerUserController: RegisterUserController): UserRouter {
    return new UserRouter(authenticateUserController, registerUserController);
  }
}

export default RouterConfiguration;