import { Router, Request, Response, NextFunction } from "express";
import { coindataService } from "./coindata.service";
const router = Router();

// routes
router.post("/:", fetchCoinMarketData);
router.get("/:symbol", getCoinMarketData);

export { router as coindataRouter };

function fetchCoinMarketData(req: any, res: Response, next: NextFunction) {
  coindataService
    .fetchCoinMarketData()
    .then((coinMarketData: any) =>
      coinMarketData ? res.json(coinMarketData) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}

function getCoinMarketData(req: any, res: Response, next: NextFunction) {
  coindataService
    .getCoinMarketData(req.params.symbol)
    .then((coinMarketData: any) =>
      coinMarketData ? res.json(coinMarketData) : res.sendStatus(404)
    )
    .catch((err: any) => next(err));
}