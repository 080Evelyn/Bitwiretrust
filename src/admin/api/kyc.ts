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
