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

export const markAsRead = async (id: string) => {
  const response = await axios.patch(`${url}/v1/user/notification/${id}/read`);
  return response.data;
};
