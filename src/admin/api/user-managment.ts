import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const allUsers = async (page: number, size?: number) => {
  const response = await axios.get(`${url}/v1/admin/users/list-all`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const totalUserCount = async () => {
  const response = await axios.get(`${url}/v1/admin/count/users/all`);
  return response.data;
};

export const totalKycVerified = async () => {
  const response = await axios.get(`${url}/v1/admin/count/kyc-verified/user`);
  return response.data;
};
