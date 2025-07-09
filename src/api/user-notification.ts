import { getToken, getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const transactions = async () => {
  const userId = getUserId();
  const token = getToken();

  const response = await axios.get(
    `${url}/v1/user/notification/transaction/all?userId=${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
