import { getEmail, getToken } from "@/utils/AuthStorage";
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
  localStorage.setItem("email", data.email);
  const response = await axios.post(`${url}/v1/auth/login`, data, {
    withCredentials: true,
  });
  localStorage.setItem("userId", response.data.data.userId);
  return response.data;
};

export const createPin = async (pin: string) => {
  const token = getToken();
  const email = getEmail();

  const response = await axios.post(
    `${url}/v1/auth/pin`,
    {
      pin,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const verifyPin = async (pin: string) => {
  const token = getToken();
  const email = getEmail();
  const response = await axios.post(
    `${url}/v1/auth/verify-pin`,
    { pin, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const createPasscode = async (data: {
  email: string;
  passcode: string;
}) => {
  const response = await axios.post(`${url}/v1/auth/set-passcode`, data);
  return response.data;
};

export const forgotPassword = async (data: { email: string }) => {
  const response = await axios.post(`${url}/v1/auth/forgot-password`, data);
  return response.data;
};

export const verifyResetPasswordOtp = async (data: {
  email: string;
  otp: string;
}) => {
  const response = await axios.post(
    `${url}/v1/auth/verify-otp-for-forget-password`,
    data
  );
  return response.data;
};

export const resetPassword = async (data: {
  email: string;
  newPassword: string;
}) => {
  const response = await axios.post(`${url}/v1/auth/reset-password`, data);
  return response.data;
};

export const bankList = async () => {
  const response = await axios.get(`${url}/v1/auth/banks-list`);
  return response.data;
};

export const verifyBankAccount = async (data: {
  accountNumber: string;
  bankName: string;
}) => {
  const token = getToken();

  const response = await axios.get(`${url}/v1/auth/verify-bank-account`, {
    params: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
