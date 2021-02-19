import { Router, Request, Response, NextFunction } from "express";
import { exchangeService } from "../exchanges/exchange.service";
import { portfolioService } from "../portfolios/portfolios.service";
import { transactionService } from "./transactions.service";
const router = Router();

// routes
router.get("/:exchangeId", getTransactions);
router.get("/", getAllTransactions);

export { router as transactionsRouter };

function getTransactions(req: any, res: Response, next: NextFunction)
{
  transactionService.getTransactions(req.params.exchangeId)
  .then((transactions: any) =>
  transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getAllTransactions(req: any, res: Response, next: NextFunction)
{
  var userId = req.user.sub;
  transactionService.getAllTransactions(userId)
  .then((transactions: any) =>
  transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));  
}
