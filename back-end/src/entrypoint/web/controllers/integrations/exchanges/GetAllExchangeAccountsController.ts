import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { ExchangeAccount } from '../../../../../core/entities';
import { UserNotFound } from '../../../../../core/use-cases/common/errors';
import { GetAllExchangeAccountsResponse, GetAllExchangeAccountsUseCase, GetAllExchangeAccountsInvalidRequest } from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class GetAllExchangeAccountsController extends BaseController<GetAllExchangeAccountsUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: GetAllExchangeAccountsResponse = await this.usecase.execute({ email: req.user.sub });

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof GetAllExchangeAccountsInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const exchangeAccounts: ExchangeAccount[] = result.getValue();
		this.ok<ExchangeAccount[]>(res, exchangeAccounts);
		return;
	}
}

export default GetAllExchangeAccountsController;
