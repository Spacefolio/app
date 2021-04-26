import { Request, Response } from 'express';
import { UseCaseError } from '../../../../core/definitions';
import { User } from '../../../../core/entities';
import { RegisterUserInvalidRequest, RegisterUserResponse, RegisterUserUseCase, UserAlreadyExists } from '../../../../core/use-cases/user';
import BaseController from '../../common/definitions/Controller';

class RegisterUserController extends BaseController<RegisterUserUseCase> {
	protected async processRequest(req: Request, res: Response): Promise<void> {
		const result: RegisterUserResponse = await this.usecase.execute(req.body);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof RegisterUserInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof UserAlreadyExists) {
				this.unprocessable(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const createdUser: Readonly<User> = result.getValue();
		this.created(res, createdUser);
		return;
	}
}

export default RegisterUserController;