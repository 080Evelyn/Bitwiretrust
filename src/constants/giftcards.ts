import {
  Addidas,
  Amazon,
  Dominos,
  DoorDash,
  Fortnite,
  GroceryBazaar,
  Netflix,
  Playstation,
  Playstore,
} from "@/assets";

export const giftCards = [
  {
    image: Amazon,
    tittle: "Amazon",
    rate: 500,
  },
  {
    image: Fortnite,
    tittle: "Fortnite",
    rate: 500,
  },
  {
    image: Netflix,
    tittle: "Netflix",
    rate: 500,
  },
  {
    image: Playstore,
    tittle: "Playstore",
    rate: 500,
  },
  {
    image: Playstation,
    tittle: "Playstation",
    rate: 500,
  },
  {
    image: Dominos,
    tittle: "Domino's",
    rate: 500,
  },
  {
    image: DoorDash,
    tittle: "DoorDash",
    rate: 500,
  },
  {
    image: Addidas,
    tittle: "Addidas",
    rate: 500,
  },
  {
    image: GroceryBazaar,
    tittle: "Grocery Bazaar",
    rate: 500,
  },
];

export const amountRanges = {
  USD: [
    { id: 1, label: "$10 - $100", min: 10, max: 100 },
    { id: 2, label: "$101 - $500", min: 101, max: 500 },
    { id: 3, label: "$501 - $2000", min: 501, max: 2000 },
    { id: 4, label: "$2001+", min: 2001, max: Infinity },
  ],
  EUR: [
    { id: 1, label: "€10 - €100", min: 10, max: 100 },
    { id: 2, label: "€101 - €500", min: 101, max: 500 },
    { id: 3, label: "€501 - €2000", min: 501, max: 2000 },
    { id: 4, label: "€2001+", min: 2001, max: Infinity },
  ],
  CAD: [
    { id: 1, label: "$10 - $100", min: 10, max: 100 },
    { id: 2, label: "$101 - $500", min: 101, max: 500 },
    { id: 3, label: "$501 - $2000", min: 501, max: 2000 },
    { id: 4, label: "$2001+", min: 2001, max: Infinity },
  ],
  GBP: [
    { id: 1, label: "£10 - £100", min: 10, max: 100 },
    { id: 2, label: "£101 - £500", min: 101, max: 500 },
    { id: 3, label: "£501 - £2000", min: 501, max: 2000 },
    { id: 4, label: "£2001+", min: 2001, max: Infinity },
  ],
  CHF: [
    { id: 1, label: "CHF10 - CHF100", min: 10, max: 100 },
    { id: 2, label: "CHF101 - CHF500", min: 101, max: 500 },
    { id: 3, label: "CHF501 - CHF2000", min: 501, max: 2000 },
    { id: 4, label: "CHF2001+", min: 2001, max: Infinity },
  ],
};

export const currencyList = [
  { id: 1, code: "USD", symbol: "$" },
  { id: 2, code: "EUR", symbol: "€" },
  { id: 1, code: "CAD", symbol: "$" },
  { id: 3, code: "GBP", symbol: "£" },
  { id: 4, code: "CHF", symbol: "CHF" },
];
