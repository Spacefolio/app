import { Router, Request, Response, NextFunction } from "express";

import { IExchangeAccountDocument } from "./exchange.model";
import { exchangeService } from "./exchange.service";

const router = Router();

// routes
router.post("/", create);
router.get("/", getAll);
router.get("/available-exchanges", getAvailableExchanges);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/sync", sync);

export { router as exchangesRouter };

function create(req: any, res: Response, next: NextFunction) {
  exchangeService
    .create(req.user.sub, req.body)
    .then((linkedExchange: any) =>
      linkedExchange ? res.json(linkedExchange) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getAll(req: any, res: Response, next: NextFunction) {
  exchangeService
    .getAll(req.user.sub)
    .then((linkedExchanges: any) => res.json(linkedExchanges))
    .catch((err: any) => next(err));
}

function getById(req: any, res: Response, next: NextFunction) {
  exchangeService
    .getById(req.params.exchangeId)
    .then((exchange: any) => (exchange ? res.json(exchange) : res.sendStatus(404)))
    .catch((err: any) => next(err));
}

function update(req: any, res: Response, next: NextFunction) {
  exchangeService
    .update(req.user.sub, req.params.id, req.body)
    .then((exchange: any) => (exchange ? res.json(exchange) : res.sendStatus(400)))
    .catch((err: any) => next(err));
}

function _delete(req: any, res: Response, next: NextFunction) {
  exchangeService
    .delete(req.user.sub, req.params.id)
    .then(() => res.json({}))
    .catch((err: any) => next(err));
}

function getAvailableExchanges(req: any, res: Response, next: NextFunction) {
  exchangeService
    .getAvailableExchanges()
    .then((requiredCredentials: object) => res.json(requiredCredentials))
    .catch((err: any) => next(err));
}

function sync(req: any, res: Response, next: NextFunction) {
  exchangeService
    .syncAllExchangesData(req.user.sub)
    .then((response: any) => res.json({ response }))
    .catch((err: any) => next(err));
}
