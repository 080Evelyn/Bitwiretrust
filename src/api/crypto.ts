import { getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;
export const cryptoMarkets = async () => {
  const response = await axios.get(`${url}/v1/user/crypto/markets`);
  return response.data;
};

export const currencyTickers = async (currency: string) => {
  const response = await axios.get(`${url}/v1/user/crypto/tickers/${currency}`);
  return response.data;
};

export const fetchWallets = async () => {
  const userId = getUserId()!;
  const response = await axios.get(
    `${url}/v1/user/crypto/${userId}/fetch-persist-wallets`,
    { params: { userId } }
  );
  return response.data;
};

export const tickers = async () => {
  const response = await axios.get(`${url}/v1/user/crypto/tickers`);
  return response.data;
};

export const validateAddress = async (data: {
  address: string;
  currency: string;
}) => {
  const response = await axios.get(`${url}/v1/user/crypto/validate-address`, {
    params: data,
  });
  return response.data;
};

export const walletAddress = async (quidaxUserId: string, currency: string) => {
  const response = await axios.get(
    `${url}/v1/user/crypto/wallet-address/${quidaxUserId}/${currency}`
  );
  return response;
};

export const withdrawalHistory = async (data: {
  userId: string;
  currency: string;
  state: string;
  orderBy?: string;
}) => {
  const userId = getUserId();
  if (userId) {
    data.userId = userId;
  }
  const response = await axios.get(`${url}/v1/user/crypto/withdrawal`, {
    params: data,
  });
  return response;
};
