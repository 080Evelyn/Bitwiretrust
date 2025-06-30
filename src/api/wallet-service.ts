import { getEmail, getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const dvaInfo = async () => {
  const email = getEmail();

  const response = await axios.get(
    `${url}/v1/user/wallet-service/dva-info/${email}`
  );

  return response.data;
};

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

// export const pollDeposit = async () => {
//   const response = await axios.post(
//     `${url}/v1/user/wallet-service/poll-deposits`
//   );
//   return response.data;
// };

export const createRecipient = async (data: {
  name: string;
  userId: string;
  account_number: string;
  bank_code: string;
  currency: string;
}) => {
  const response = await axios.post(
    `${url}/v1/user/wallet-service/create-recipient?userId=${data.userId}`,
    data
  );
  return response.data;
};
