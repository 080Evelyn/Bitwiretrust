import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const totalUsersCount = async () => {
  const response = await axios.get(`${url}/v1/admin/users/count`);
  return response.data;
};
export const totalTransactionCount = async () => {
  const response = await axios.get(`${url}/v1/admin/transaction-counts`);
  return response.data;
};
