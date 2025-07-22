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
