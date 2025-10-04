import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const fiatWithdrawalRequest = async (page: number, size?: number) => {
  const response = await axios.get(`${url}/v1/admin/pending/fiat-withdraws`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const processedFiatWithdrawalRequest = async (
  page: number,
  size?: number
) => {
  const response = await axios.get(`${url}/v1/admin/processed/fiat-withdraws`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};

export const approveWithdrawalRequest = async (id: number) => {
  const response = await axios.patch(
    `${url}/v1/admin/${id}/approve-mark-successful`
  );
  return response.data;
};
