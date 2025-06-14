import { getEmail, getToken, getUserId } from "@/utils/AuthStorage";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const dvaInfo = async () => {
  const email = getEmail();
  const token = getToken();

  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await axios.get(
    `${url}/v1/user/wallet-service/dva-info/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const initiateTransaction = async (data: {
  source: string;
  amount: number;
  reason?: string;
}) => {
  const userId = getUserId();
  const token = getToken();

  if (!token || !userId) throw new Error("Missing token or userId");

  const response = await axios.post(
    `${url}/v1/user/wallet-service/${userId}/initiate`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const transactions = async () => {
  const email = getEmail();
  const token = getToken();

  const response = await axios.get(
    `${url}/v1/user/wallet-service/transactions/${email}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const pollDeposit = async () => {
  const response = await axios.post(
    `${url}/v1/user/wallet-service/poll-deposits`
  );
  return response.data;
};

export const createRecipient = async (data: {
  name: string;
  userId: string;
  account_number: string;
  bank_code: string;
  currency: string;
}) => {
  const token = getToken();

  const response = await axios.post(
    `${url}/v1/user/wallet-service/create-recipient?userId=${data.userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
