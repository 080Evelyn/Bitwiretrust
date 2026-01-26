import { User } from "./user";

export interface ButtonsProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  iconSrc?: string;
  altText?: string;
  iconPosition?: "left" | "right";
  className?: string;
}

export interface Transaction {
  id: number;
  type: "withdrawal" | "deposit";
  amount: number;
  status: "successful" | "pending";
  date: string;
  currency: string;
  value: string;
}

export interface Testimonial {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  icon: string;
}

export type FAQItem = {
  question: string;
  answer: string;
};

export interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export enum Step {
  CREATE_ACCOUNT = 0,
  VERIFY_EMAIL = 1,
  GET_STARTED = 2,
  CREATE_PASSCODE = 3,
  ADD_BANK_ACCOUNT = 4,
}

export type loginResponseData = {
  accessToken: string;
  isPinSet: boolean;
  userRole: string;
  isKycVerified: boolean;
};

export interface HeaderProps {
  username: string;
}

export interface TransactionRate {
  id: string;
  image: string;
  type: "received" | "transferred" | "updated";
  amount: string;
  currency: string;
  description: string;
  subdescription: string;
  status: "green" | "orange" | "red";
}

export interface RateData {
  id: string;
  name: string;
  image: string;
  amount: string;
  icon: string;
}

interface NavLink {
  to: string;
  text: string;
  icon: string;
  subLinks?: {
    to: string;
    text: string;
  }[];
}
export interface SidebarContentProps {
  onClick?: () => void;
  navLinks: NavLink[];
  bottomLinks: NavLink[];
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  fullName: string;
}

export interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export type ContextType = {
  user: User;
};

export type ModalType =
  | "profile"
  | "invite"
  | "contact"
  | "settings"
  | "security-settings"
  | "transaction-pin"
  | "confirm-transaction-pin"
  | "notifications"
  | "legal"
  | "terms-and-conditions"
  | "policies"
  | "kyc"
  | null;

export type NetworkProviderKey = "mtn" | "airtel" | "nineMobile" | "glo";

export interface GiftCardDetailsProps {
  amount: number | null;
  setAmount: (value: number | null) => void;
  selectedCard: { tittle: string; image: string; rate: number };
}
export interface GiftCardAmountProps {
  amount: number | null;
  selectedCard: { tittle: string; image: string; rate: number };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: string;
  date: Date;
  status: "successful" | "failed" | "pending";
  icon?: "wallet" | "send" | "bell";
}

export interface NotificationMessage {
  tittle: boolean;
  subtittle: string;
}
export interface TransactionData {
  id: string;
  userId: string;
  title: string;
  message: string;
  requestId: string;
  type: string;
  isRead: boolean;
  createdAt: Date;
  amount: number;
  status: string;
  transactionCategory: string;
}

export interface KycSubmitProps {
  // fullName: string;
  userId: string;
  idNumber: string;
  // email: string;
  // phoneNumber: string;
  // residentialAddress: string;
  // gender: string;
  // dateOfBirth: string;
  sourceOfIncome: string;
  documentType: string;
  // utilityBillImageUrl: string;
  //   documentImageUrl: string;
  //   selfieImageUrl: string;
}

export interface UtilityUploadProps {
  userId: string;
  file: string;
}

export interface TransactionListResponse {
  responseCode: string;
  responseMsg: string;
  data: TransactionData[];
}

export interface AddBankProps {
  accountNumber: string;
  bankCode: string;
  accountName: string;
}

export interface WalletRequestProps {
  userId: string;
  currency: string;
  amount: number;
  narration: string;
  commissionWithdrawal?: boolean;
}
