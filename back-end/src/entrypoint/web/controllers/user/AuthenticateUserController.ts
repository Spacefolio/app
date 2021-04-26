import { NextFunction, Request, Response } from 'express';
import { UseCaseError } from '../../../../core/definitions';
import {
	AuthenticateUserInvalidRequest,
	AuthenticateUserResponse,
	AuthenticateUserUseCase,
	InvalidCredentials,
	UserNotFound,
} from '../../../../core/use-cases/user/authenticateUser';
import BaseController from '../../common/definitions/Controller';

class AuthenticateUserController extends BaseController<AuthenticateUserUseCase> {
	protected async processRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result: AuthenticateUserResponse = await this.usecase.execute(req.body);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof AuthenticateUserInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof InvalidCredentials) {
				this.unauthorized(res, error);
				return;
			} else if (error instanceof UserNotFound ) {
				this.unauthorized(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		next();
		return;
	}
}

export default AuthenticateUserController;