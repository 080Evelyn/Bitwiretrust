import { OrderGiftCardProps } from "@/types/gift-card";
import axios from "./axiosConfig";
import { getUserId } from "@/utils/AuthStorage";

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
  const userId = getUserId()!;
  const response = await axios.post(
    `${url}/v1/user/giftcard/order?userId=${userId}`,
    data
  );
  return response.data;
};
