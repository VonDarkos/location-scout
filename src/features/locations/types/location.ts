export type LocationType =
  | "studio"
  | "loft"
  | "villa"
  | "warehouse"
  | "office"
  | "hotel"
  | "restaurant"
  | "outdoor-space"
  | "other";

export type EnvironmentType = "indoor" | "outdoor" | "both";

export type Location = {
  id: string;
  name: string;
  city: string;
  address: string;
  type: LocationType;
  environment: EnvironmentType;
  dailyPrice: number;
  capacity: number;
  surface: number;
  parking: boolean;
  naturalLight: boolean;
  electricity: boolean;
  accessible: boolean;
  image: string;
  contactName: string;
  phone?: string;
  email?: string;
  description?: string;
  notes?: string;
};
