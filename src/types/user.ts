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
}

export type UserContext = { user: User };
