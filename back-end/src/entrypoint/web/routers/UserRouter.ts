import { Router } from 'express';
import { body, check } from 'express-validator';
import { BodyValidationMiddleware } from '../common/middleware';
import { CheckRegistrationController, RegisterUserController } from '../controllers';
import AuthenticateUserController from '../controllers/user/AuthenticateUserController';
import BaseRouter from '../common/definitions/Router';
import { UserMiddleware } from '../middleware';

class UserRouter implements BaseRouter {
	authenticateUserController: AuthenticateUserController;
	registerUserController: RegisterUserController;
  checkRegistrationController: CheckRegistrationController;
	router: Router;

	constructor(
		authenticateUserController: AuthenticateUserController,
		registerUserController: RegisterUserController,
		checkRegistrationController: CheckRegistrationController
	) {
		this.authenticateUserController = authenticateUserController;
		this.registerUserController = registerUserController;
    this.checkRegistrationController = checkRegistrationController;
		this.router = Router();
		this.configRouter();
	}

	private configRouter(): void {
		this.router.post(`/authenticate`, [
			body('email').isEmail(),
			body('password').isString(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			this.authenticateUserController.getRequestHandler(),
			UserMiddleware.createJwt,
		]);
		this.router.post('/register', [
			body('email').isEmail(),
			body('username').isString(),
			body('password').isString(),
			body('firstName').isString(),
			body('lastName').isString(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			UserMiddleware.hashPassword,
			this.registerUserController.getRequestHandler(),
		]);
		this.router.post('/registration-check', [this.checkRegistrationController.getRequestHandler()]);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default UserRouter;
