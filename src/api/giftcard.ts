import { OrderGiftCardProps } from "@/types/gift-card";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const giftcard = async () => {
  const response = await axios.get(`${url}/v1/user/giftcard`);
  return response.data;
};

export const giftcardCountries = async () => {
  const response = await axios.get(
    `${url}/v1/user/giftcard/giftcard-countries`
  );
  return response.data;
};
export const allGiftcards = async () => {
  const response = await axios.get(`${url}/v1/user/giftcard/products`);
  return response.data;
};

export const countriesGiftCard = async (countryCode: string) => {
  const response = await axios.get(
    `${url}/v1/user/giftcard/countries/${countryCode}`
  );
  return response.data;
};

export const orderGiftCard = async (data: OrderGiftCardProps) => {
  const response = await axios.post(`${url}/v1/user/giftcard/order`, data);
  return response.data;
};
