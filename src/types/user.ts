interface WalletProps {
  totalPayments: string;
  id: string;
  reference: string;
  balance: string;
  destination_tag: string;
  total_payments: string;
  created_at: string;
  updated_at: string;
  currency: string;
  address: string;
}

export interface User {
  first_name: string;
  last_name: string;
  isKycVerified: boolean;
  email: string;
  wallets: WalletProps[];
}

export type UserContext = { user: User };
