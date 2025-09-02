export interface WalletProps {
  id: string;
  name: string;
  currency: string;
  balance: number;
  locked: number;
  staked: number;
  converted_balance: number;
  reference_currency: string;
  is_crypto: boolean;
  created_at: string;
  updated_at: string;
  blockchain_enabled: boolean;
  default_network: string;
  deposit_address: string;
  destination_tag: string;
  networks: networks[];
}
type networks = {
  id: string;
  name: string;
  deposits_enabled: boolean;
  withdraws_enabled: boolean;
};

export interface SelectWalletProps {
  title?: string;
  onSelect?: (coin: WalletProps) => void;
  wallets: WalletProps[];
  isPending?: boolean;
  error: unknown | null;
}

export interface CoinWalletProps {
  coin: WalletProps | null;
}

export interface Coin {
  id: string;
  name: string;
  image: string;
  amount: string;
  value?: string;
  symbol: string;
  bgColor: string;
}

export interface TickersProps {
  market: string;
  buy: string;
  sell: string;
  last: string;
  volume: string;
}

export interface SwapQuotationProps {
  from_currency?: string;
  to_currency?: string;
  from_amount?: string;
  to_amount?: string;
  dbUserId: string | null;
  requestId: string;
}

export interface WalletAddressProps {
  currency: string;
  network: string;
}

export interface NetworkWalletsProps {
  data: {
    responseCode: string;
    responseMsg: string;
    responseDesc: string;
    data: {
      status: string;
      message: string;
      data: IndividualNetworkWalletPops[];
    };
  };
}

export interface IndividualNetworkWalletPops {
  id: string;
  reference: string;
  currency: string;
  address: string;
  network: string;
  destination_tag: string;
  total_payments: string;
  created_at: Date;
  updated_at: Date;
}
