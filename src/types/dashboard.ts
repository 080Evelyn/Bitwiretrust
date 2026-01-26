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
  category: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  status: string;
  description: string;
  createdAt: Date;
  serviceType: string;
  microTransactionType?: string;
  beneficiary?: null;
  productName?: null;
  providerStatus?: null;
  providerTransactionId?: null;
  completedAt: string;
  initiatedAt: string;
  meterNumber?: number;
  customerName?: string;
  token?: string;
  units?: number;
  tariff?: string;
};
