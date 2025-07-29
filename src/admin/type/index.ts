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
