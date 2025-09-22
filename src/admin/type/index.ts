export interface TransactionLogProps {
  avatar: string;
  name: string;
  transactionType: string;
  transactionId: string;
  status: string;
  date: Date;
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

export interface FilteredTransactionProps {
  transactionTypes?: string[];
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
