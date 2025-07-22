export interface GiftCardCountriesProps {
  isoName: string;
  name: string;
  currencyCode: string;
  currencyName: string;
}

export interface CountryGiftCardListProps {
  productId: number;
  productName: string;
  global: true;
  status: string;
  supportsPreOrder: true;
  senderFee: number;
  senderFeePercentage: number;
  discountPercentage: number;
  denominationType: string;
  recipientCurrencyCode: string;
  minRecipientDenomination: number;
  maxRecipientDenomination: number;
  senderCurrencyCode: string;
  minSenderDenomination: number;
  maxSenderDenomination: number;
  fixedRecipientDenominations: [number];
  fixedSenderDenominations: [number];
  fixedRecipientToSenderDenominationsMap: {
    additionalProp1: number;
    additionalProp2: number;
    additionalProp3: number;
  };
  metadata: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  logoUrls: [string];
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
    userIdRequired: true;
  };
}
