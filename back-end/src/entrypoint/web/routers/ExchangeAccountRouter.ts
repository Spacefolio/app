import { Router } from "express";
import { body } from "express-validator";
import { BodyValidationMiddleware } from "../common/middleware";
import BaseRouter from "../common/definitions/Router";
import { AddExchangeAccountController, RemoveExchangeAccountController } from "../controllers";

class ExchangeAccountRouter implements BaseRouter {
  addExchangeAccountController: AddExchangeAccountController;
  removeExchangeAccountController: RemoveExchangeAccountController;
  router: Router;
  
  constructor(addExchangeAccountController: AddExchangeAccountController, removeExchangeAccountController: RemoveExchangeAccountController) {
    this.addExchangeAccountController = addExchangeAccountController;
    this.removeExchangeAccountController = removeExchangeAccountController;
    this.router = Router();
    this.configRouter();
  }

  private configRouter(): void {
    this.router.post(`/`, [
      body('exchange').isString(),
      body('nickname').isString(),
      body('credentials').isObject(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      this.addExchangeAccountController.getRequestHandler()
    ]);
    this.router.delete('/:accountId', [
      this.removeExchangeAccountController.getRequestHandler()
    ]);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default ExchangeAccountRouter;  