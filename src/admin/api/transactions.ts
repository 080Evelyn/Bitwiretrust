import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const transactionLog = async () => {
  const response = await axios.get(`${url}/v1/admin/transaction-logs`);
  return response.data;
};

export const transactionStatusCount = async () => {
  const response = await axios.get(
    `${url}/v1/admin/transactions/status-counts`
  );
  return response.data;
};
