import {
  Airtel,
  Glo,
  ikejaDisco,
  Mtn,
  NineMobile,
  showmax,
  sportybet,
} from "@/assets";
import { NetworkProviderKey } from "@/types";

export const billers = [
  { id: "ikeja", title: "Ikeja Disco", image: ikejaDisco },
  { id: "showmax", title: "SHOWMAX", image: showmax },
  { id: "sportybet", title: "SPORTYBET", image: sportybet },
];

export const networkProviders: {
  id: NetworkProviderKey;
  name: string;
  image: string;
}[] = [
  { id: "mtn", name: "MTN", image: Mtn },
  { id: "airtel", name: "Airtel", image: Airtel },
  { id: "glo", name: "Glo", image: Glo },
  { id: "nineMobile", name: "9Mobile", image: NineMobile },
];

export const dataPlans: Record<
  NetworkProviderKey,
  { id: number; label: string; price: number }[]
> = {
  mtn: [
    { id: 1, label: "Weekly 1GB", price: 600 },
    { id: 2, label: "Monthly 4.5GB", price: 1500 },
  ],
  airtel: [
    { id: 1, label: "Weekly 1GB", price: 400 },
    { id: 2, label: "Monthly 4.5GB", price: 1000 },
  ],
  glo: [
    { id: 1, label: "Weekly 1GB", price: 200 },
    { id: 2, label: "Monthly 4.5GB", price: 800 },
  ],
  nineMobile: [
    { id: 1, label: "Weekly 1GB", price: 550 },
    { id: 2, label: "Monthly 4.5GB", price: 1000 },
  ],
};
