import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const allUsers = async () => {
  const response = await axios.get(`${url}/v1/admin/transaction-logs`);
  return response.data;
};
