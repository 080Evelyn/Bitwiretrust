export interface DvaAccountInfo {
  accountName: string;
  accountNumber: string;
  bankName: string;
  walletBalance: number;
}

export interface BankList {
  name: string;
  code: string;
}

export interface BankListInfo {
  responseCode: string;
  responseMsg: string;
  data: BankList[];
}
