
import type { LocationType } from "./location";
import type { EnvironmentType } from "./location";
export type LocationFormState = {
  name:string;
  city:string;
  address:string;
  type: LocationType | ""
  environment : EnvironmentType | ""
  dailyPrice:string;
  capacity:string;
  surface:string;
  parking: boolean;
  naturalLight: boolean;
  electricity: boolean;
  accessible: boolean;
  image: string;
  contactName: string;
  phone: string;
  email: string;
  description: string;
  notes: string;
}

export type LocationFormErrors = Partial<Record<keyof LocationFormState | "contact", string>>

export const initialLocationFormData: LocationFormState = {
  name: "",
  city: "",
  address: "",
  type: "",
  environment: "",
  dailyPrice: "",
  capacity: "",
  surface: "",
  parking: false,
  naturalLight: false,
  electricity: false,
  accessible: false,
  image: "",
  contactName: "",
  phone: "",
  email: "",
  description: "",
  notes: "",
};