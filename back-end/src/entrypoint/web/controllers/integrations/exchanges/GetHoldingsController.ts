import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { IHolding } from '../../../../../core/entities';
import { ExchangeAccountNotFound, UserNotFound } from '../../../../../core/use-cases/common/errors';
import { GetCurrentHoldingsInvalidRequest, GetCurrentHoldingsUseCase, GetCurrentHoldingsResponse } from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class GetHoldingsController extends BaseController<GetCurrentHoldingsUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: GetCurrentHoldingsResponse = await this.usecase.execute({ email: req.user.sub, accountId: req.params.accountId });

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof GetCurrentHoldingsInvalidRequest) {
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

		const holdings: Readonly<IHolding[]> = result.getValue();
		this.ok<Readonly<IHolding[]>>(res, holdings);
		return;
	}
}

export default GetHoldingsController;
