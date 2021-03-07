import { timeframe } from "../../../types";
import { RD, SPACING } from "../AlgonexStyles/ResponsiveDesign";


export const ReformatCurrencyValue = (value: number, currencyType: string) => {
  switch (currencyType) {
    case "BTC":
      return value.toFixed(8);
    case "USD":
    case "USDC":
    case "USDT":
      return value.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    default:
      if(value > 5) {
        return value.toString()
      } else{
        return value.toFixed(6);
      }
      
  }
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