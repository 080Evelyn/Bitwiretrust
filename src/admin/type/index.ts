export interface TransactionLogProps {
  amount: number;
  createdAt: string;
  currency: string;
  description: string;
  id: number;
  reference: string;
  status: string;
  type: string;
}

export interface KycData {
  dateOfBirth: string;
  documentType: string;
  email: string;
  fullName: string;
  gender: string;
  idNumber: string;
  phoneNumber: string;
  residentialAddress: string;
  sourceOfIncome: string;
  status: string;
  submittedAt: string;
  userId: string;
  utilityBillImageUrl: string;
}

export enum category {
  MICROTRANSACTION = "MICROTRANSACTION",
  GIFTCARD = "GIFTCARD",
  CRYPTOSWAP = "CRYPTOSWAP",
  MAINNET = "MAINNET",
  FIAT_WITHDRAWAL = "FIAT_WITHDRAWAL",
  REFUND = "REFUND",
}

export interface FilteredTransactionProps {
  category?: category;
  status?: string;
  fromDate?: string;
  toDate?: string;
  page?: string;
  size?: string;
}

export interface AllUsersProps {
  avatar?: string;
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  userRole: string;
  isKycVerified: boolean;
  isPinSet: boolean;
  bitWalletId: string;
  walletBalance: string;
  walletCurrency: string;
  accountStatus: string;
  isBankLinked: boolean;
  bankDetails: bankDetails;
  walletCreatedAt: Date;
}
export interface AllKycUsersProps {
  avatar?: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
  status: string;
  isPinSet: boolean;
  sourceOfIncome: string;
  walletBalance: string;
  residentialAddress: string;
  walletCurrency: string;
  accountStatus: string;
  dateOfBirth: Date;
  gender: string;
}
interface bankDetails {
  id: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
  bankLinked: boolean;
}
export interface AllUsersPage {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface AllCryptoTransactions {
  amount: number;
  balanceAfter: number;
  balanceBefore: number;
  category: string;
  createdAt: Date;
  description: string;
  id: number;
  reference: string;
  status: string;
  type: string;
  walletId: number;
}

export interface WithdrawalRequestProps {
  accountName: string;
  accountNumber: string;
  amount: number;
  bankCode: string;
  bankName: string;
  commissionWithdrawal: boolean;
  createdAt: string;
  currency: string;
  fee: number;
  id: number;
  narration: string;
  requestId: string;
  status: string;
  total: number;
  updatedAt: Date;
  userId: number;
}

export interface WithdrawalTableProps {
  compact?: boolean;
}
