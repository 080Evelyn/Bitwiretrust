import {
  CableSubscriptionProps,
  ElectricityPurchase,
} from "@/types/utility-payment";
import { getToken, getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";

const url = import.meta.env.VITE_API_URL;

export const serviceCategories = async () => {
  const token = getToken();

  const response = await axios.get(
    `${url}/v1/user/microtransaction/service-categories`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const serviceIdentifiers = async (identifier: string) => {
  const token = getToken();

  const response = await axios.get(
    `${url}/v1/user/microtransaction/service-ids/${identifier}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const electricityBillerVerificationCode = async (serviceID: string) => {
  const token = getToken();

  const response = await axios.get(
    `${url}/v1/user/microtransaction/variation-codes/${serviceID}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const verifyMeterNumber = async (data: {
  billersCode: string;
  serviceID: string;
  type: string;
}) => {
  const token = getToken();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/meter/verify`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const prepaidElectricityPurchase = async (data: ElectricityPurchase) => {
  const token = getToken();
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/electricity/prepaid/purchase/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const postpaidElectricityPurchase = async (
  data: ElectricityPurchase
) => {
  const token = getToken();
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/electricity/postpaid/purchase/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const cableSubscription = async (data: CableSubscriptionProps) => {
  const token = getToken();
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/cable/${data.identifier}/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const purchaseAirtime = async (data: {
  request_id: string;
  serviceID: string;
  amount: number;
  phone: string;
}) => {
  const token = getToken();
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/airtime/purchase/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};

export const purchaseData = async (data: {
  requestId: string;
  serviceID: string;
  billersCode: string;
  variation_code: string;
  amount: number;
  phone: string;
}) => {
  const token = getToken();
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/microtransaction/data/purchase/${userId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
