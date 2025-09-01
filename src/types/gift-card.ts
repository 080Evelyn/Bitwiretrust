export interface GiftCardCountriesProps {
  isoName: string;
  name: string;
  currencyCode: string;
  currencyName: string;
}

export interface CountryGiftCardListProps {
  productId: number;
  productName: string;
  global: boolean;
  status: string;
  supportsPreOrder: boolean;
  senderFee: number;
  senderFeePercentage: number;
  discountPercentage: number;
  denominationType: string;
  recipientCurrencyCode: string;
  minRecipientDenomination: number | null;
  maxRecipientDenomination: number | null;
  senderCurrencyCode: string;
  minSenderDenomination: number | null;
  maxSenderDenomination: number | null;
  fixedRecipientDenominations: string[];
  fixedSenderDenominations: number[] | null;
  fixedRecipientToSenderDenominationsMap: Record<string, string> | null;
  metadata: Record<string, string> | null;
  logoUrls: string[];
  brand: {
    brandId: number;
    brandName: string;
  };
  category: {
    id: string;
    name: string;
  };
  country: {
    isoName: string;
    name: string;
    flagUrl: string;
  };
  redeemInstruction: {
    concise: string;
    verbose: string;
  };
  additionalRequirements: {
    userIdRequired: boolean;
  };
}

export interface OrderGiftCardProps {
  customIdentifier: string;
  preOrder: boolean;
  productAdditionalRequirements: {
    userId: string;
  };
  productId: number;
  quantity: number;
  recipientEmail: string;
  senderName: string;
  unitPrice: number;
  totalPrice: number;
  requestId: string;
}
