import { Request, Response } from 'express';
import { UseCaseError } from '../../../../core/definitions';
import { RegisterUserInvalidRequest, RegisterUserResponseDto, RegisterUserUseCase, UserAlreadyExists } from '../../../../core/use-cases/user';
import BaseController from '../../common/definitions/Controller';

class RegisterUserController extends BaseController<RegisterUserUseCase> {
	protected async processRequest(req: Request, res: Response): Promise<void> {
		const result: RegisterUserResponseDto = await this.usecase.execute(req.body);

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

		this.created(res, result.getValue());
		return;
	}
}

export default RegisterUserController;