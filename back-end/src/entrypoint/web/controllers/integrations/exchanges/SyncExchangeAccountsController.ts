import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { ExchangeAccount } from '../../../../../core/entities';
import {
	SyncExchangeAccountsInvalidRequest,
	SyncExchangeAccountsRequest,
	SyncExchangeAccountsResponse,
	SyncExchangeAccountsUseCase,
	UserNotFound,
} from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class SyncExchangeAccountsController extends BaseController<SyncExchangeAccountsUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const request: SyncExchangeAccountsRequest = {
			email: req.user.sub,
		};

		const result: SyncExchangeAccountsResponse = await this.usecase.execute(request);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof SyncExchangeAccountsInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const syncedExchangeAccounts: Readonly<ExchangeAccount>[] = result.getValue();
		this.created(res, { exchangeAccounts: syncedExchangeAccounts });
		return;
	}
}

export default SyncExchangeAccountsController;
