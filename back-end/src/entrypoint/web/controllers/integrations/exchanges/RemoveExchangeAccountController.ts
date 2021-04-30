import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { ExchangeAccount } from '../../../../../core/entities';
import { ExchangeAccountNotFound } from '../../../../../core/use-cases/common/errors';
import {
	RemoveExchangeAccountInvalidRequest,
	RemoveExchangeAccountResponse,
	RemoveExchangeAccountUseCase,
	UserNotFound,
} from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class RemoveExchangeAccountController extends BaseController<RemoveExchangeAccountUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: RemoveExchangeAccountResponse = await this.usecase.execute({ email: req.user.sub, accountId: req.params.accountId });

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof RemoveExchangeAccountInvalidRequest) {
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

		const deletedExchangeAccount: Readonly<ExchangeAccount> = result.getValue();
		this.ok<ExchangeAccount>(res, deletedExchangeAccount);
		return;
	}
}

export default RemoveExchangeAccountController;
