import React from "react";
import { BaseSvg } from "../../_styles";

export const decideTransactionIcon = (type: string) => {
  switch (type) {
    case "buy":
      return BuyTransactionIcon();
    case "sell":
      return SellTransactionIcon();
    case "withdrawal":
      return WithdrawTransactionIcon();
    case "deposit":
      return DepositTransactionIcon();
    default:
      return "RIP";
  }
};

export const SellTransactionIcon = () => {
  return (
    <BaseSvg
      viewBox="0 0 40 40"
      role="img"
      aria-labelledby="transactionTypeTrade"
      height="60"
      width="60"
    >
      <circle cx="20" cy="20" fill="#E4EAF2" r="20"></circle>
      <path
        d="M25.707 19.293l4 4a1 1 0 01.083 1.32l-.083.094-4 4-1.414-1.414L26.584 25H16v-2h10.584l-2.291-2.293 1.414-1.414zm-11.414-8l1.414 1.414L13.415 15H24v2H13.415l2.292 2.293-1.414 1.414-4-4a1 1 0 01-.083-1.32l.083-.094 4-4z"
        fill="#8494A5"
      ></path>
    </BaseSvg>
  );
};

export const BuyTransactionIcon = () => {
  return (
    <BaseSvg
      viewBox="0 0 40 40"
      role="img"
      aria-labelledby="transactionTypeTrade"
      height="60"
      width="60"
    >
      <circle cx="20" cy="20" fill="#E4EAF2" r="20"></circle>
      <path
        d="M25.707 19.293l4 4a1 1 0 01.083 1.32l-.083.094-4 4-1.414-1.414L26.584 25H16v-2h10.584l-2.291-2.293 1.414-1.414zm-11.414-8l1.414 1.414L13.415 15H24v2H13.415l2.292 2.293-1.414 1.414-4-4a1 1 0 01-.083-1.32l.083-.094 4-4z"
        fill="#8494A5"
      ></path>
    </BaseSvg>
  );
};

export const DepositTransactionIcon = () => {
  return (
    <BaseSvg
      viewBox="0 0 40 40"
      role="img"
      aria-labelledby="transactionTypeDeposit"
      height="60"
      width="60"
    >
      <circle cx="20" cy="20" fill="#E4EAF2" r="20"></circle>
      <path
        d="M21 11v14.584l2.293-2.291 1.414 1.414-4 4a1 1 0 01-1.32.083l-.094-.083-4-4 1.414-1.414L19 25.584V11h2z"
        fill="#8494A5"
      ></path>
    </BaseSvg>
  );
};

export const WithdrawTransactionIcon = () => {
  return (
    <BaseSvg
      viewBox="0 0 40 40"
      role="img"
      aria-labelledby="transactionTypeWithdraw"
      height="60"
      width="60"
    >
      <circle cx="20" cy="20" fill="#E4EAF2" r="20"></circle>
      <path
        d="M20.613 11.21l.094.083 4 4-1.414 1.414L21 14.414V29h-2V14.414l-2.293 2.293-1.414-1.414 4-4a1 1 0 011.32-.083z"
        fill="#8494A5"
      ></path>
    </BaseSvg>
  );
};
