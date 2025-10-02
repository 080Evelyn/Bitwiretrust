import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const allCryptoTransactions = async (page: number, size?: number) => {
  const response = await axios.get(
    `${url}/v1/admin/crypto/all-users-wallets/trnsaction`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return response.data;
};
