import { Router } from 'express';
import { body } from 'express-validator';
import { BodyValidationMiddleware } from '../common/middleware';
import BaseRouter from '../common/definitions/Router';
import {
	AddExchangeAccountController,
	GetAllExchangeAccountsController,
	GetExchangeAccountController,
	GetHoldingsController,
	GetTransactionsController,
	RemoveExchangeAccountController,
	SyncExchangeAccountController
} from '../controllers';

class ExchangeAccountRouter implements BaseRouter {
	addExchangeAccountController: AddExchangeAccountController;
	removeExchangeAccountController: RemoveExchangeAccountController;
	getExchangeAccountController: GetExchangeAccountController;
	getAllExchangeAccountsController: GetAllExchangeAccountsController;
	getHoldingsController: GetHoldingsController;
	getTransactionsController: GetTransactionsController;
	syncExchangeAccountController: SyncExchangeAccountController;
	router: Router;

	constructor(
		addExchangeAccountController: AddExchangeAccountController,
		removeExchangeAccountController: RemoveExchangeAccountController,
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController,
		getHoldingsController: GetHoldingsController,
		getTransactionsController: GetTransactionsController,
		syncExchangeAccountController: SyncExchangeAccountController
	) {
		this.addExchangeAccountController = addExchangeAccountController;
		this.removeExchangeAccountController = removeExchangeAccountController;
		this.getExchangeAccountController = getExchangeAccountController;
		this.getAllExchangeAccountsController = getAllExchangeAccountsController;
		this.getHoldingsController = getHoldingsController;
		this.getTransactionsController = getTransactionsController;
		this.syncExchangeAccountController = syncExchangeAccountController;
		this.router = Router();
		this.configRouter();
	}

	private configRouter(): void {
		this.router.get(`/`, [this.getAllExchangeAccountsController.getRequestHandler()]);
		this.router.get(`/:accountId`, [this.getExchangeAccountController.getRequestHandler()]);
		this.router.get(`/:accountId/transactions`, [this.getTransactionsController.getRequestHandler()]);
		this.router.get(`/:accountId/holdings`, [this.getHoldingsController.getRequestHandler()]);
		this.router.post(`/`, [
			body('exchange').isString(),
			body('nickname').isString(),
			body('credentials').isObject(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			this.addExchangeAccountController.getRequestHandler(),
		]);
		this.router.post(`/:accountId/sync`, [this.syncExchangeAccountController.getRequestHandler()]);
		this.router.delete('/:accountId', [this.removeExchangeAccountController.getRequestHandler()]);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default ExchangeAccountRouter;
