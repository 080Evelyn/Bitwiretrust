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

export const totalRevenue = async (params: { month: number; year: number }) => {
  const response = await axios.get(`${url}/v1/admin/overview/revenue`, {
    params,
  });
  return response.data;
};

export const serviceStatsFn = async (params: {
  month: number;
  year: number;
}) => {
  const response = await axios.get(`${url}/v1/admin/overview/service-stats`, {
    params,
  });
  return response.data;
};

export const userEngagement = async (params: {
  month?: number;
  year: number;
}) => {
  const response = await axios.get(`${url}/v1/admin/overview/user-engagement`, {
    params,
  });
  return response.data;
};
