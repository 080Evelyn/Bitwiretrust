import { category } from "../type";

export const servicesConstant = [
  {
    name: "Micro Transactions",
    id: category.MICROTRANSACTION,
  },
  {
    name: "Gift Cards",
    id: category.GIFTCARD,
  },
  {
    name: "Crypto Swap",
    id: category.CRYPTOSWAP,
  },
  {
    name: "Fiat Withdrawal",
    id: category.FIAT_WITHDRAWAL,
  },
  {
    name: "Refund",
    id: category.REFUND,
  },
];

export const statusConstant = [
  {
    name: "Unsuccessful",
    id: "FAILED",
  },
  {
    name: "Successful",
    id: "SUCCESS",
  },
  {
    name: "Pending",
    id: "PENDING",
  },
];

export const datesConstant = [
  {
    name: "Last 3 days",
  },
  {
    name: "This Month",
  },
  {
    name: "Last 3 months",
  },
];
