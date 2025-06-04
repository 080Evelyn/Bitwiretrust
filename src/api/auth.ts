import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const createAccount = async (data: {
  first_name: string;
  last_name: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${url}/v1/auth/signup`, data);
  return response.data;
};

export const verifyEmailCode = async (data: { otp: string; email: string }) => {
  const response = await axios.post(`${url}/v1/auth/continue-signup`, data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${url}/v1/auth/login`, data);
  return response.data;
};

export const createPasscode = async (data: {
  email: string;
  passcode: string;
}) => {
  const response = await axios.post(`${url}/v1/auth/set-passcode`, data);
  return response.data;
};
