import { Response } from "express";
import { UseCaseError } from "../../../../../core/definitions";
import { Exchange, ExchangeAccount, IExchangeCredentials } from "../../../../../core/entities";
import { AddExchangeAccountInvalidRequest, AddExchangeAccountRequest, AddExchangeAccountResponse, AddExchangeAccountUseCase, InvalidExchangeCredentials, UserNotFound } from "../../../../../core/use-cases/integration/exchangeAccount";
import BaseController from "../../../common/definitions/Controller";
import JwtRequest from "../../../common/definitions/JwtRequest";

export interface AddExchangeAccountRequestBody {
	exchange: Exchange;
	nickname: string;
	credentials: IExchangeCredentials;
}

class AddExchangeAccountController extends BaseController<AddExchangeAccountUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		
		const request: AddExchangeAccountRequest = {
			email: req.user.sub,
			exchange: <Exchange>req.body.exchange,
			nickname: req.body.nickname,
			credentials: req.body.credentials
		}

		const result: AddExchangeAccountResponse = await this.usecase.execute(request);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof AddExchangeAccountInvalidRequest) {
				this.badRequest(res, error);
				return;
      } else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			} else if (error instanceof InvalidExchangeCredentials) {
				this.badRequest(res, error);
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