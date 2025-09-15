import { getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";
import { AddBankProps, WalletRequestProps } from "@/types";

const url = import.meta.env.VITE_API_URL;

export const initiateTransaction = async (data: {
  source: string;
  amount: number;
  reason?: string;
}) => {
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/wallet-service/${userId}/initiate`,
    data
  );

  return response.data;
};

export const bankList = async () => {
  const response = await axios.get(`${url}/v1/user/wallet-service/banks-list`);
  return response.data;
};

export const verifyBankAccount = async (data: {
  accountNumber: string;
  bankCode: string;
}) => {
  const response = await axios.get(
    `${url}/v1/user/wallet-service/verify-bank-account`,
    { params: data }
  );

  return response.data;
};

export const addBankAccount = async (data: AddBankProps) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/wallet-service/${userId}/bank-details?userId=${userId}`,
    data
  );
  return response.data;
};
export const withdrawalRequest = async (data: WalletRequestProps) => {
  const response = await axios.post(
    `${url}/v1/user/wallet-service/request/withdrawal`,
    data
  );
  return response.data;
};
