import { KycSubmitProps } from "@/types";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const kycSubmission = async (data: KycSubmitProps) => {
  const response = await axios.post(`${url}/v1/auth/kyc/submit`, data);
  return response.data;
};
