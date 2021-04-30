import { Router } from "express";
import BaseRouter from "../common/definitions/Router";
import ExchangeAccountRouter from "./ExchangeAccountRouter";

class IntegrationRouter implements BaseRouter {
  exchangeAccountRouter: ExchangeAccountRouter;
  router: Router;
  
  constructor(exchangeAccountRouter: ExchangeAccountRouter) {
    this.exchangeAccountRouter = exchangeAccountRouter;
    this.router = Router();
    this.configRouter();
  }

  private configRouter(): void {
    this.router.use(`/exchanges`, this.exchangeAccountRouter.getRouter());
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default IntegrationRouter;  