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
