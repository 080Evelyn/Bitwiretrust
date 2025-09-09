// interface WalletProps {
//   totalPayments: string;
//   id: string;
//   reference: string;
//   balance: string;
//   destination_tag: string;
//   total_payments: string;
//   created_at: string;
//   updated_at: string;
//   currency: string;
//   address: string;
// }

export interface User {
  accountStatus: string;
  bitWalletId: string;
  email: string;
  first_name: string;
  isKycVerified: string;
  isPinSet: string;
  last_name: string;
  phone: string;
  userId: number;
  userRole: string;
  walletBalance: number;
  walletCurrency: string;
  bankDetails: bankDetails;
}

interface bankDetails {
  id: 0;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
  bankLinked: boolean;
}

export type UserContext = { user: User };
