import { Response } from 'express';
import { ExchangeAccountNotFound, UserNotFound } from '../../../../core/use-cases/common/errors';
import { UseCaseError } from '../../../../core/definitions';
import BaseController from '../../common/definitions/Controller';
import JwtRequest from '../../common/definitions/JwtRequest';
import {
	GetMetaportfolioChartInvalidRequest,
	GetMetaportfolioChartRequest,
	GetMetaportfolioChartResponse,
	GetMetaportfolioChartUseCase,
} from '../../../../core/use-cases/portfolio/getMetaportfolioChart';
import { Chart } from '../../../../core/entities';
import { ExchangeAccountsNotSynced } from '../../../../core/use-cases/portfolio/getMetaportfolioChart/errors';

class GetMetaportfolioChartController extends BaseController<GetMetaportfolioChartUseCase> {
	protected async processRequest(req: JwtRequest, res: Response): Promise<void> {
    const request: GetMetaportfolioChartRequest = {
      email: req.user.sub,
      timeframe: req.query.timeframe as string || 'ALL',
			accountId: req.params.accountId
    };

		const result: GetMetaportfolioChartResponse = await this.usecase.execute(request);

		if (result.isError) {
			const error: UseCaseError = result.getError() as UseCaseError;

			if (error instanceof GetMetaportfolioChartInvalidRequest) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof UserNotFound) {
				this.notFound(res, error);
				return;
			} else if (error instanceof ExchangeAccountNotFound) {
				this.badRequest(res, error);
				return;
			} else if (error instanceof ExchangeAccountsNotSynced) {
				this.badRequest(res, error);
				return;
			}

			this.fail(res, error.message);
			return;
		}

		const metaportfolioChart: Chart = result.getValue();
		this.ok<Chart>(res, metaportfolioChart);
		return;
	}
}

export default GetMetaportfolioChartController;
