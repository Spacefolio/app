import { Router } from 'express';
import BaseRouter from '../common/definitions/Router';
import {
	GetAllExchangeAccountsController,
	GetExchangeAccountController,
	SyncExchangeAccountsController
} from '../controllers';

class PortfolioRouter implements BaseRouter {
	getAllExchangeAccountsController: GetAllExchangeAccountsController;
  getExchangeAccountController: GetExchangeAccountController;
	syncExchangeAccountsController: SyncExchangeAccountsController;
	router: Router;

	constructor(
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		syncExchangeAccountsController: SyncExchangeAccountsController
	) {
		this.getExchangeAccountController = getExchangeAccountController;
		this.getAllExchangeAccountsController = getAllExchangeAccountsController;
		this.syncExchangeAccountsController = syncExchangeAccountsController;
		this.router = Router();
		this.configRouter();
	}

	private configRouter(): void {
		this.router.get(`/`, [this.getAllExchangeAccountsController.getRequestHandler()]);
		this.router.get(`/exchanges/:accountId`, [this.getExchangeAccountController.getRequestHandler()]);
		this.router.post(`/sync`, [this.syncExchangeAccountsController.getRequestHandler()]);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default PortfolioRouter;
