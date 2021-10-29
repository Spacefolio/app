import { Response } from 'express';
import { UseCaseError } from '../../../../../core/definitions';
import { IExchange } from '../../../../../core/entities';
import { GetAvailableExchangesResponse, GetAvailableExchangesUseCase } from '../../../../../core/use-cases/integration/exchangeAccount';
import BaseController from '../../../common/definitions/Controller';
import JwtRequest from '../../../common/definitions/JwtRequest';

class GetAvailableExchangesController extends BaseController<GetAvailableExchangesUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
		const result: GetAvailableExchangesResponse = await this.usecase.execute(req);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			this.fail(res, error.message);
			return;
		}

		const exchanges: IExchange[] = result.getValue();
		this.ok<IExchange[]>(res, exchanges);
		return;
	}
}

export default GetAvailableExchangesController;
