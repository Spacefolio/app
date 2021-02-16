import { Router, Request, Response, NextFunction } from "express";
import { IPortfolioData } from "../../../types";
const router = Router();
import { exchangeService } from "../exchanges/exchange.service";
import { portfolioService } from "./portfolios.service";

// routes
router.get("/:sync?", getPortfolio);

export { router as portfolioRouter };

function getPortfolio(req: any, res: Response, next: NextFunction) {
  portfolioService
    .get(req.user.sub, req.params.sync)
    .then((portfolioData: any) =>
      portfolioData ? res.json(portfolioData) : res.sendStatus(404)
    )
    .catch((err) => next(err));
}
