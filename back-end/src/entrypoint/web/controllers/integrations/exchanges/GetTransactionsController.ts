import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { IDigitalAssetTransaction } from '../../../../../core/entities/Integrations/Transaction';
import { ExchangeAccountNotFound, UserNotFound } from '../../../../../core/use-cases/common/errors';
import { GetTransactionsInvalidRequest, GetTransactionsUseCase, GetTransactionsResponse } from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class GetTransactionsController extends BaseController<GetTransactionsUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: GetTransactionsResponse = await this.usecase.execute({ email: req.user.sub, accountId: req.params.accountId });

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof GetTransactionsInvalidRequest) {
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

		const transactions: Readonly<IDigitalAssetTransaction[]> = result.getValue();
		this.ok<Readonly<IDigitalAssetTransaction[]>>(res, transactions);
		return;
	}
}

export default GetTransactionsController;
