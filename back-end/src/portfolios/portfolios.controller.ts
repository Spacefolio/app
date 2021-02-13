import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import { exchangeService } from '../exchanges/exchange.service';

// routes
router.get('/', );

export { router as portfolioRouter };

function create(req: any, res: Response, next: NextFunction) {
  console.log(req.body, req.user.sub);
    exchangeService.create(req.user.sub, req.body)
        .then((linkedExchange) => linkedExchange ? res.json(linkedExchange) : res.sendStatus(404))
        .catch(err => next(err));
}