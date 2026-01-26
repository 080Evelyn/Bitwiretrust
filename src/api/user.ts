import { getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const uploadProfileImage = async (data: FormData) => {
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/users/profile/${userId}/upload/profile-pic`,
    data,
  );

  return response.data;
};

export const fetchUser = async () => {
  const userId = getUserId();
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/v1/users/profile/${userId}`,
  );
  return res.data.data;
};

export const resetPasswordInProfile = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await axios.post(`${url}/v1/auth/reset-password`, data);
  return response.data;
};
