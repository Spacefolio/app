import { Request, Response } from 'express';
import { UseCaseError } from '../../../../core/definitions';
import { CheckRegistrationInvalidRequest, CheckRegistrationResponse, CheckRegistrationUseCase } from '../../../../core/use-cases/user';
import BaseController from '../../common/definitions/Controller';

class CheckRegistrationController extends BaseController<CheckRegistrationUseCase> {
	protected async processRequest(req: Request, res: Response): Promise<void> {
		const result: CheckRegistrationResponse = await this.usecase.execute(req.body);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof CheckRegistrationInvalidRequest) {
				this.badRequest(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const registered: boolean = result.getValue();
		this.ok(res, { registered: registered });
		return;
	}
}

export default CheckRegistrationController;
