import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const totalUsersCount = async () => {
  const response = await axios.get(`${url}/v1/admin/users/count`);
  return response.data;
};
export const totalTransactionCount = async () => {
  const response =
    await axios.get(`${url}/v1/admin/dashboard/wallet/transactions/count
`);
  return response.data;
};

export const totalRevenue = async (params: { month: number; year: number }) => {
  const response = await axios.get(
    `${url}/v1/admin/dashboard/wallet/transactions/revenue`,
    {
      params,
    }
  );
  return response.data;
};

export const serviceStatsFn = async (params: {
  month?: number;
  year: number;
}) => {
  const response = await axios.get(
    `${url}/v1/admin/dashboard/users/engagement/services`,
    {
      params,
    }
  );
  return response.data;
};

export const userEngagement = async (params: {
  month?: number;
  year: number;
}) => {
  const response = await axios.get(
    `${url}/v1/admin/dashboard/users/engagement`,
    {
      params,
    }
  );
  return response.data;
};
