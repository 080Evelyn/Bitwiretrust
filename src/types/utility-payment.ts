export interface ServiceList {
  identifier: string;
  name: string;
}

export interface ServiceCategoryListResponse {
  responseCode: string;
  responseMsg: string;
  responseDesc: string;
  data: ServiceList[];
}

export interface Biller {
  serviceID: string;
  name: string;
  image: string;
  minimium_amount: string;
  maximum_amount: string;
  convinience_fee: string;
  product_type: string;
}

export interface BillerVerificationProps {
  content: {
    variations: [variations];
    ServiceName: string;
    serviceID: string;
    convinience_fee: string;
  };
  response_description: string;
}

export interface variations {
  name: string;
  fixedPrice: string;
  variation_code: string;
  variation_amount: string;
}

export interface ElectricityPurchase {
  requestId: string;
  serviceID: string;
  variation_code: string;
  billersCode: string;
  phone: string;
  amount: number;
  type?: string;
}

export interface CableSubscriptionProps {
  requestId: string;
  serviceID: string;
  billersCode: string;
  variation_code: string;
  amount: number;
  phone?: string;
  identifier: string;
}
