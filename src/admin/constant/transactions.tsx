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
    name: "Mainnet",
    id: category.MAINNET,
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
    id: "failed",
  },
  {
    name: "Successful",
    id: "success",
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
