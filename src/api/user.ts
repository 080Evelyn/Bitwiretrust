import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const userDetails = async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!token || !userId) throw new Error("Missing token or user ID");

  const response = await axios.get(
    `${url}/v1/user/wallet-service/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};
