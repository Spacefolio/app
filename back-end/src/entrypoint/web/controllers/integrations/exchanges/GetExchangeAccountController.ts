import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { ExchangeAccount } from '../../../../../core/entities';
import { ExchangeAccountNotFound, UserNotFound } from '../../../../../core/use-cases/common/errors';
import { GetExchangeAccountInvalidRequest, GetExchangeAccountResponse, GetExchangeAccountUseCase } from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class GetExchangeAccountController extends BaseController<GetExchangeAccountUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: GetExchangeAccountResponse = await this.usecase.execute({ email: req.user.sub, accountId: req.params.accountId });

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof GetExchangeAccountInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			} else if (error instanceof ExchangeAccountNotFound) {
				this.notFound(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const exchangeAccount: Readonly<ExchangeAccount> = result.getValue();
		this.ok<ExchangeAccount>(res, exchangeAccount);
		return;
	}
}

export default GetExchangeAccountController;
