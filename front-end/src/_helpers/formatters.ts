import { timeframe } from "../../../types";
import { RD, SPACING } from "../AlgonexStyles/ResponsiveDesign";

export const ReformatCurrencyValue = (value: number, currencyType: string) => {
  if (value == 0) return 0;
  switch (currencyType) {
    case "BTC":
      return value.toFixed(8);
    case "USD":
    case "USDC":
    case "USDT":
      return value.toLocaleString(undefined, {
        maximumFractionDigits: 6,
        minimumFractionDigits: 0,
      });
    default:
      return value.toLocaleString(undefined, {
        maximumFractionDigits: 6,
        minimumFractionDigits: 0,
      });
  }
};

export const ReformatAmountValue = (value: number) => {
  return value.toLocaleString();
};

export const timeFrameSelectors: timeframe[] = [
  "24H",
  "1W",
  "1M",
  "3M",
  "6M",
  "1Y",
  "ALL",
];
