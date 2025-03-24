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
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum Step {
  CREATE_ACCOUNT = 0,
  VERIFY_EMAIL = 1,
  GET_STARTED = 2,
  CREATE_PASSCODE = 3
}

export interface HeaderProps {
  username: string;
}

export interface TransactionRate {
  id: string;
  image: string;
  type: 'received' | 'transferred' | 'updated';
  amount: string;
  currency: string;
  description: string;
  subdescription: string;
  status: 'green' | 'orange' | 'red';
}

export interface RateData {
  id: string;
  name: string;
  image: string;
  amount: string;
  icon: string;
}

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileImage: string;
  email: string;
  username: string;
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