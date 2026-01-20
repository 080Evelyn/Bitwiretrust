import { getUserId } from "@/utils/AuthStorage";
import axios from "./axiosConfig";
import {
  CreateSwapQuotationProps,
  SendCryptoProps,
  SwapQuotationProps,
  WalletAddressProps,
} from "@/types/crypto";

const url = import.meta.env.VITE_API_URL;
export const cryptoMarkets = async () => {
  const response = await axios.get(`${url}/v1/user/crypto/markets`);
  return response.data;
};

export const currencyTickers = async (currency: string) => {
  const response = await axios.get(`${url}/v1/user/crypto/tickers/${currency}`);
  return response.data;
};

export const fetchPersistWallet = async () => {
  const userId = getUserId()!;
  const response = await axios.get(
    `${url}/v1/user/crypto/${userId}/fetch-persist-wallets`,
    { params: { userId } },
  );
  return response.data;
};
export const fetchWallets = async () => {
  const dbUserId = getUserId()!;
  const response = await axios.get(
    `${url}/v1/user/crypto/${dbUserId}/get-crypto/wallets`,
    { params: { dbUserId } },
  );
  return response.data;
};

export const tickers = async () => {
  const response = await axios.get(`${url}/v1/user/crypto/tickers`);
  return response.data;
};
export const ticker = async (currency: string) => {
  const response = await axios.get(`${url}/v1/user/crypto/ticker`, {
    params: { currency },
  });
  return response.data;
};

export const validateAddress = async (data: {
  address: string;
  currency: string;
}) => {
  const response = await axios.get(`${url}/v1/user/crypto/validate-address`, {
    params: data,
  });
  return response.data;
};

export const walletAddress = async (quidaxUserId: string, currency: string) => {
  const response = await axios.get(
    `${url}/v1/user/crypto/wallet-address/${quidaxUserId}/${currency}`,
  );
  return response;
};
export const swapQuotation = async (data: SwapQuotationProps) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/crypto/${userId}/swap-quotation`,
    data,
  );
  return response;
};
export const createSwapQuotation = async (data: CreateSwapQuotationProps) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/crypto/${userId}/create-swap-quotation`,
    data,
  );
  return response;
};

export const refreshSwapQuotation = async (
  swapQuoteId: string,
  data: CreateSwapQuotationProps,
) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/crypto/${userId}/swap-quotation/${swapQuoteId}/refresh`,
    data,
  );
  return response;
};

export const confirmSwapQuotation = async (
  swapQuoteId: string,
  data: { requestId: string; commissionFee: number },
) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/crypto/${swapQuoteId}/confirm-swap/${userId}`,
    data,
  );
  return response;
};

export const withdrawalHistory = async (data: {
  userId: string;
  currency: string;
  state: string;
  orderBy?: string;
}) => {
  const userId = getUserId();
  if (userId) {
    data.userId = userId;
  }
  const response = await axios.get(`${url}/v1/user/crypto/withdrawal`, {
    params: data,
  });
  return response;
};

export const fetchWalletAddress = async (data: WalletAddressProps) => {
  const userId = getUserId();

  const response = await axios.post(
    `${url}/v1/user/crypto/${userId}/addresses?userId=${userId}`,
    data,
  );
  return response;
};

export const fetchWalletAddressByNetwork = async (currency: string) => {
  const userId = getUserId();

  const response = await axios.get(
    `${url}/v1/user/crypto/${userId}/${currency}/addresses?userId=${userId}`,
  );
  return response;
};

export const sendCrypto = async (data: SendCryptoProps) => {
  const userId = getUserId();
  const response = await axios.post(
    `${url}/v1/user/crypto/send/crypto/external-withdrawal?userId=${userId}`,
    data,
  );
  return response;
};

export const cryptoCurrencyFee = async ({
  currency,
  network,
}: {
  currency: string;
  network: string;
}) => {
  const response = await axios.get(`${url}/v1/currencies/fee`, {
    params: { currency, network },
  });
  return response.data;
};

export const fetchCryptoWithdrawalHistory = async (data: {
  userId: string;
  currency: string;
  state?: string;
}) => {
  const userId = getUserId();
  if (userId) {
    data.userId = userId;
  }
  const response = await axios.get(`${url}/v1/user/crypto/all-withdrawals`, {
    params: data,
  });
  return response;
};
export const fetchCryptoSwapHistory = async ({
  currency,
}: {
  currency: string;
}) => {
  const userId = getUserId();
  const response = await axios.get(
    `${url}/v1/user/crypto/${userId}/swap-transactions


`,
    {
      params: { userId, currency },
    },
  );
  return response;
};
export const fetchCryptoDepositHistory = async (data: {
  userId: string;
  currency: string;
  state?: string;
}) => {
  const userId = getUserId();
  if (userId) {
    data.userId = userId;
  }
  const response = await axios.get(`${url}/v1/user/crypto/${userId}/deposits`, {
    params: data,
  });
  return response;
};
