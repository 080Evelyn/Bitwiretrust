import {
  AAVE,
  Bitcoin,
  BUSD,
  depositCrypto,
  NairaLogo,
  plusCircle,
  sendCrypto,
  swapCrypto,
} from "@/assets";

export const coinAssets = [
  {
    id: "1",
    name: "Naira",
    image: NairaLogo,
    amount: "",
    value: "28,000",
    symbol: "NGN",
    bgColor: "#0FA301",
  },
  {
    id: "2",
    name: "Aave",
    image: AAVE,
    amount: "1",
    value: "54,000",
    symbol: "AAVE",
    bgColor: "#2EBAC6",
  },
  {
    id: "3",
    name: "Bitcoin",
    image: Bitcoin,
    amount: "0.00",
    value: "0.00",
    symbol: "BTC",
    bgColor: "#F7AE02",
  },
  {
    id: "4",
    name: "BUSD",
    image: BUSD,
    amount: "8",
    value: "20,000",
    symbol: "BUSD",
    bgColor: "#F7AE02",
  },
];

export const coinTransactions = [
  // Naira Transactions
  {
    id: 1,
    coinId: "1",
    type: "Deposit",
    image: NairaLogo,
    amount: "28,000",

    symbol: "NGN",
    date: "10 May, 2025",
  },
  {
    id: 2,
    coinId: "1",
    type: "Withdrawal",
    image: NairaLogo,
    amount: "15,500",

    symbol: "NGN",
    date: "08 May, 2025",
  },
  {
    id: 3,
    coinId: "1",
    type: "Deposit",
    image: NairaLogo,
    amount: "42,000",

    symbol: "NGN",
    date: "05 May, 2025",
  },

  // Aave Transactions
  {
    id: 4,
    coinId: "2",
    type: "Withdrawal",
    image: AAVE,
    amount: "54,000",
    value: "1",
    symbol: "AAVE",
    date: "11 May, 2025",
  },
  {
    id: 5,
    coinId: "2",
    type: "Deposit",
    image: AAVE,
    amount: "25,000",
    value: "0.45",
    symbol: "AAVE",
    date: "07 May, 2025",
  },
  {
    id: 6,
    coinId: "2",
    type: "Deposit",
    image: AAVE,
    amount: "75,000",
    value: "1.5",
    symbol: "AAVE",
    date: "02 May, 2025",
  },

  // Bitcoin Transactions
  {
    id: 7,
    coinId: "3",
    type: "Deposit",
    image: Bitcoin,
    amount: "150,000",
    value: "0.003",
    symbol: "BTC",
    date: "12 May, 2025",
  },
  {
    id: 8,
    coinId: "3",
    type: "Deposit",
    image: Bitcoin,
    amount: "320,000",
    value: "0.0065",
    symbol: "BTC",
    date: "09 May, 2025",
  },
  {
    id: 9,
    coinId: "3",
    type: "Withdrawal",
    image: Bitcoin,
    amount: "80,000",
    value: "0.0015",
    symbol: "BTC",
    date: "06 May, 2025",
  },

  // BUSD Transactions
  {
    id: 10,
    coinId: "4",
    type: "Withdrawal",
    image: BUSD,
    amount: "20,000",
    value: "8",
    symbol: "BUSD",
    date: "13 May, 2025",
  },
  {
    id: 11,
    coinId: "4",
    type: "Withdrawal",
    image: BUSD,
    amount: "50,000",
    value: "20",
    symbol: "BUSD",
    date: "10 May, 2025",
  },
  {
    id: 12,
    coinId: "4",
    type: "Deposit",
    image: BUSD,
    amount: "10,000",
    value: "4",
    symbol: "BUSD",
    date: "04 May, 2025",
  },
];

export const actions = [
  {
    title: "Buy",
    img: plusCircle,
  },
  {
    title: "Send",
    img: sendCrypto,
  },
  {
    title: "Deposit",
    img: depositCrypto,
  },
  {
    title: "Swap",
    img: swapCrypto,
  },
];
