import { Response } from "express";
import { UseCaseError } from "../../../../../core/definitions";
import { ExchangeAccount } from "../../../../../core/entities";
import { ExchangeAccountNotFound, SyncExchangeAccountInvalidRequest, SyncExchangeAccountRequest, SyncExchangeAccountResponse, SyncExchangeAccountUseCase, UserNotFound } from "../../../../../core/use-cases/integration/exchangeAccount";
import BaseController from "../../../common/definitions/Controller";
import JwtRequest from "../../../common/definitions/JwtRequest";

class SyncExchangeAccountController extends BaseController<SyncExchangeAccountUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		
		const request: SyncExchangeAccountRequest = {
			email: req.user.sub,
			accountId: req.params.accountId
		};

		const result: SyncExchangeAccountResponse = await this.usecase.execute(request);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof SyncExchangeAccountInvalidRequest) {
				this.badRequest(res, error);
				return;
      } else if (error instanceof UserNotFound || error instanceof ExchangeAccountNotFound) {
				this.notFound(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const syncedExchangeAccount: Readonly<ExchangeAccount> = result.getValue();
		this.created(res, syncedExchangeAccount);
		return;
	}
}

export default SyncExchangeAccountController;