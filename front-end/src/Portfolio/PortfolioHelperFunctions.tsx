export const trimFields = (value: number, currencyType: string) => {
  switch (currencyType) {
    case "BTC":
      return value.toFixed(8);
    case "USD":
      return value.toFixed(2);
    case "USDC":
      return value.toFixed(2);
    case "USDT":
      return value.toFixed(2);
    default:
      return value.toFixed(6);
  }
};
