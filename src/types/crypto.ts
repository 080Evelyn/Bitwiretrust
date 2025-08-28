export interface WalletProps {
  id: string;
  currency: string;
  address: string;
  balance: number;
  convertedBalance: number;
  destination_tag: string;
  total_payments: number;
  generatedAt: Date;
  name: string;
  referenceCurrency: string;
  lockedBalance: number;
  stakedBalance: number;
  blockchainEnabled: boolean;
  defaultNetwork: string;
  networksJson: string;
  generated: boolean;
}

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
