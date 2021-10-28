import { Router } from 'express';
import BaseRouter from '../common/definitions/Router';
import {
	GetAllExchangeAccountsController,
	GetExchangeAccountController,
	GetMetaportfolioChartController,
	SyncExchangeAccountsController
} from '../controllers';

class PortfolioRouter implements BaseRouter {
	getAllExchangeAccountsController: GetAllExchangeAccountsController;
  getExchangeAccountController: GetExchangeAccountController;
	syncExchangeAccountsController: SyncExchangeAccountsController;
  getMetaportfolioChartController: GetMetaportfolioChartController;
	router: Router;

	constructor(
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		syncExchangeAccountsController: SyncExchangeAccountsController,
    getMetaportfolioChartController: GetMetaportfolioChartController
	) {
		this.getExchangeAccountController = getExchangeAccountController;
		this.getAllExchangeAccountsController = getAllExchangeAccountsController;
		this.syncExchangeAccountsController = syncExchangeAccountsController;
    this.getMetaportfolioChartController = getMetaportfolioChartController;
		this.router = Router();
		this.configRouter();
	}

	private configRouter(): void {
		this.router.get(`/`, [this.getAllExchangeAccountsController.getRequestHandler()]);
		this.router.get(`/exchanges/chart`, [this.getMetaportfolioChartController.getRequestHandler()]);
		this.router.get(`/exchanges/:accountId`, [this.getExchangeAccountController.getRequestHandler()]);
		this.router.post(`/sync`, [this.syncExchangeAccountsController.getRequestHandler()]);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default PortfolioRouter;
