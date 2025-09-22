import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const allUsers = async (page: number, size?: number) => {
  const response = await axios.get(`${url}/v1/admin/users/list-all`, {
    params: {
      page,
      size,
    },
  });
  return response.data;
};
