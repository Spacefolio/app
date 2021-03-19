import { Router, Request, Response, NextFunction, response } from "express";
import { transactionService } from "../transactions/transactions.service";
import { IPortfolioDataView, ITimeframe, timespan } from "../../../types";
const router = Router();
import { exchangeService } from "../exchanges/exchange.service";
import { portfolioItemSchema } from "./portfolio.model";
import { portfolioService } from "./portfolios.service";

// routes
router.get("/", getPortfolios);
router.post("/sync", syncPortfolios);
router.get("/transactions", getTransactionsAcrossAllPortfolios);
router.get("/open-orders", getOpenOrdersAcrossAllPortfolios);
router.get("/chart", getMetaportfolioChart);
router.get("/:portfolioId/transactions", getTransactionsForAPortfolio);
router.get("/:portfolioId/chart", getPortfolioChart);
router.get("/:portfolioId", getPortfolio);
router.put("/:portfolioId", updatePortfolio);
router.delete("/:portfolioId", deletePortfolio);

router.get("/:portfolioId/open-orders", getOpenOrdersForAPortfolio);

export { router as portfolioRouter };

function getPortfolios(req: any, res: Response, next: NextFunction) {
  portfolioService
    .getAll(req.user.sub)
    .then((portfolioData: any) =>
      portfolioData ? res.json(portfolioData) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function getPortfolio(req: any, res: Response, next: NextFunction) {
  portfolioService
    .get(req.user.sub, req.params.portfolioId)
    .then((portfolioData: any) =>
      portfolioData ? res.json(portfolioData) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function syncPortfolios(req: any, res: Response, next: NextFunction) {
  portfolioService
    .sync(req.user.sub)
    .then((portfolioData: any) =>
      portfolioData ? res.json(portfolioData) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}

function updatePortfolio(req: any, res: Response, next: NextFunction) {
  exchangeService
    .update(req.user.sub, req.params.portfolioId, req.body)
    .then((exchange) => (exchange ? res.json(exchange) : res.sendStatus(400)))
    .catch((err) => next(err));
}

function deletePortfolio(req: any, res: Response, next: NextFunction) {
  exchangeService
    .delete(req.user.sub, req.params.portfolioId)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getTransactionsAcrossAllPortfolios(
  req: any,
  res: Response,
  next: NextFunction
) {
  transactionService
    .getAllTransactions(req.user.sub)
    .then((transactions: any) =>
      transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getTransactionsForAPortfolio(
  req: any,
  res: Response,
  next: NextFunction
) {
  transactionService
    .getTransactions(req.user.sub, req.params.portfolioId)
    .then((transactions: any) =>
      transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getOpenOrdersAcrossAllPortfolios(
  req: any,
  res: Response,
  next: NextFunction
) {
  transactionService
    .getAllOpenOrders(req.user.sub)
    .then((transactions: any) =>
      transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getOpenOrdersForAPortfolio(
  req: any,
  res: Response,
  next: NextFunction
) {
  transactionService
    .getOpenOrders(req.user.sub, req.params.portfolioId)
    .then((transactions: any) =>
      transactions ? res.json(transactions) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getMetaportfolioChart(
  req: any,
  res: Response,
  next: NextFunction
) {
  let timeframe: timespan = getTimeframe(req.query.timeframe);
  
  portfolioService.getMetaportfolioChart(req.user.sub, timeframe)
  .then((chart: any) => chart ? res.json(chart) : res.sendStatus(404))
  .catch((err: any) => next(err));
}

function getPortfolioChart(req: any, res: Response, next: NextFunction)
{
  let timeframe: timespan = getTimeframe(req.query.timeframe);

  portfolioService.getPortfolioChart(req.user.sub, req.params.portfolioId, timeframe)
  .then((chart: any) => chart ? res.json(chart) : res.sendStatus(404))
  .catch((err: any) => next(err));
}

function getTimeframe(timeframe: string) : timespan
{
  var time: timespan = timeframe as timespan;
  return (time === undefined) ? timespan.ALL : time;
}