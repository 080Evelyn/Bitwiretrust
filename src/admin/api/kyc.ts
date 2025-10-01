import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const pendingKyc = async () => {
  const response = await axios.get(`${url}/v1/admin/kyc/view/pending`);
  return response.data;
};

export const approveKyc = async (userId: string) => {
  const response = await axios.post(`${url}/v1/admin/kyc/approve/${userId}`);
  return response.data;
};
export const rejectKyc = async (userId: string) => {
  const response = await axios.post(`${url}/v1/admin/kyc/reject/${userId}`);
  return response.data;
};

export const totalUnverifiedKyc = async () => {
  const response = await axios.get(`${url}/v1/admin/kyc/unverified`);
  return response.data;
};
export const allKycUsers = async (page: number, size?: number) => {
  const response = await axios.get(`${url}/v1/admin/kyc/view/all`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
