import { Router, Request, Response, NextFunction } from "express";
import { IExchangeAccountDocument } from "./exchange.model";
const router = Router();
import { exchangeService } from "./exchange.service";

// routes
router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/sync', sync);

router.get("/requiredCredentials/:exchangeType", getRequiredCredentials);

export { router as exchangesRouter };

function create(req: any, res: Response, next: NextFunction) {
  exchangeService
    .create(req.user.sub, req.body)
    .then((linkedExchange) =>
      linkedExchange ? res.json(linkedExchange) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function getAll(req: any, res: Response, next: NextFunction) {
    exchangeService.getAll(req.user.sub)
        .then(linkedExchanges => res.json(linkedExchanges))
        .catch(err => next(err));
}

function getById(req: any, res: Response, next: NextFunction) {
  exchangeService
    .getById(req.params.exchangeId)
    .then((exchange) => (exchange ? res.json(exchange) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req: any, res: Response, next: NextFunction) {
  exchangeService
    .update(req.user.sub, req.params.id, req.body)
    .then((exchange) => (exchange ? res.json(exchange) : res.sendStatus(400)))
    .catch((err) => next(err));
}

function _delete(req: any, res: Response, next: NextFunction) {
  exchangeService
    .delete(req.user.sub, req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getRequiredCredentials(req: any, res: Response, next: NextFunction) {
  exchangeService
    .getRequiredCredentials(req.params.exchangeType)
    .then((requiredCredentials: object) => res.json(requiredCredentials))
    .catch((err) => next(err));
}

function sync(req: any, res: Response, next: NextFunction) {
  exchangeService
    .syncExchangeData(req.user.sub)
    .then((response) => res.json({ response }))
    .catch((err) => next(err));
}
