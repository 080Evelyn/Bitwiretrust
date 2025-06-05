import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const dvaInfo = async () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }
  const response = await axios.get(
    `${url}/v1/user/wallet-service/dva-info/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
