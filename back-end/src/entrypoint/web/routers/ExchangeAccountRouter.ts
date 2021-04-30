import { Router } from 'express';
import { body } from 'express-validator';
import { BodyValidationMiddleware } from '../common/middleware';
import BaseRouter from '../common/definitions/Router';
import {
	AddExchangeAccountController,
	GetAllExchangeAccountsController,
	GetExchangeAccountController,
	RemoveExchangeAccountController,
} from '../controllers';

class ExchangeAccountRouter implements BaseRouter {
	addExchangeAccountController: AddExchangeAccountController;
	removeExchangeAccountController: RemoveExchangeAccountController;
	getExchangeAccountController: GetExchangeAccountController;
	getAllExchangeAccountsController: GetAllExchangeAccountsController;
	router: Router;

	constructor(
		addExchangeAccountController: AddExchangeAccountController,
		removeExchangeAccountController: RemoveExchangeAccountController,
		getExchangeAccountController: GetExchangeAccountController,
		getAllExchangeAccountsController: GetAllExchangeAccountsController
	) {
		this.addExchangeAccountController = addExchangeAccountController;
		this.removeExchangeAccountController = removeExchangeAccountController;
		this.getExchangeAccountController = getExchangeAccountController;
		this.getAllExchangeAccountsController = getAllExchangeAccountsController;
		this.router = Router();
		this.configRouter();
	}

	private configRouter(): void {
		this.router.get(`/`, [this.getAllExchangeAccountsController.getRequestHandler()]);
		this.router.get(`/:accountId`, [this.getExchangeAccountController.getRequestHandler()]);
		this.router.post(`/`, [
			body('exchange').isString(),
			body('nickname').isString(),
			body('credentials').isObject(),
			BodyValidationMiddleware.verifyBodyFieldsErrors,
			this.addExchangeAccountController.getRequestHandler(),
		]);
		this.router.delete('/:accountId', [this.removeExchangeAccountController.getRequestHandler()]);
	}

	public getRouter(): Router {
		return this.router;
	}
}

export default ExchangeAccountRouter;
