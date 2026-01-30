export interface DvaAccountInfo {
  accountName: string;
  accountNumber: string;
  bankName: string;
  walletBalance: number;
}

export interface BankList {
  name: string;
  code: string;
}

export interface BankListInfo {
  responseCode: string;
  responseMsg: string;
  data: BankList[];
}

export type TransactionHistoryProps = {
  requestId: string;
  type: string;
  serviceType: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
  beneficiary: string;
  productName: string;
  providerStatus: string;
  providerTransactionId: string;
  meterNumber: string;
  customerName: string;
  token: string;
  units: string;
  tariff: string;
};
