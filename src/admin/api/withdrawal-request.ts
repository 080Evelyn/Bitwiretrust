import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const fiatWithdrawalRequest = async (page: number, size?: number) => {
  const response = await axios.get(
    `${url}/v1/admin/all/requested/fiat-withdraws`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};
