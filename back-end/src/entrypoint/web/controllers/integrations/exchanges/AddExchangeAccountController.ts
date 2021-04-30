import { Response } from "express";
import { UseCaseError } from "../../../../../core/definitions";
import { ExchangeAccount } from "../../../../../core/entities";
import { AddExchangeAccountInvalidRequest, AddExchangeAccountResponse, AddExchangeAccountUseCase, UserNotFound } from "../../../../../core/use-cases/integration/exchangeAccount";
import BaseController from "../../../common/definitions/Controller";
import JwtRequest from "../../../common/definitions/JwtRequest";

class AddExchangeAccountController extends BaseController<AddExchangeAccountUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: AddExchangeAccountResponse = await this.usecase.execute(req.body);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof AddExchangeAccountInvalidRequest) {
				this.badRequest(res, error);
				return;
      } else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const createdExchangeAccount: Readonly<ExchangeAccount> = result.getValue();
		this.created(res, createdExchangeAccount);
		return;
	}
}

export default AddExchangeAccountController;