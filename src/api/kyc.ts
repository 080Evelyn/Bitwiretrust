import { KycSubmitProps } from "@/types";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const kycSubmission = async (data: KycSubmitProps) => {
  const response = await axios.post(`${url}/v1/user/kyc/submit`, data);
  return response.data;
};

export const utilityUpload = async (data: FormData) => {
  const response = await axios.post(
    `${url}/v1/user/kyc/upload-utility-bill`,
    data
  );
  return response.data;
};
